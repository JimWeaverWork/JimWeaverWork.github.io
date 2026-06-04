<script lang="ts">
  /* ════════════════════════════════════════════════════════════════════
     BACKDROP :: slow flow-field — drifting light over the dark
     ──────────────────────────────────────────────────────────────────
     Two layers on one canvas, redrawn each frame (no smear / no flicker):
       1. soft luminous NODES that wander along a Perlin field — the broad,
          slow "flow" that lifts the background off the foreground panels.
       2. a sparse layer of brighter SPARKS advected through the same field
          — fine "data stream" texture that keeps the engineering feel.
     The hard monospace grid is layered *over* this (in CSS) so the page
     still reads brutalist, not generic-gradient. Pointer adds a soft glow
     + a gentle swirl. Honors prefers-reduced-motion and pauses when hidden.
     ════════════════════════════════════════════════════════════════════ */

  /* ── 2-D gradient (Perlin) noise — no deps ──────────────────────────── */
  function makeNoise(seed: number) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    let s = (seed || 1) >>> 0;
    const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
    for (let i = 255; i > 0; i--) {
      const j = (rnd() * (i + 1)) | 0;
      const t = p[i]; p[i] = p[j]; p[j] = t;
    }
    const perm = new Uint8Array(512);
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (t: number, a: number, b: number) => a + t * (b - a);
    const grad = (h: number, x: number, y: number) => ((h & 1) ? -x : x) + ((h & 2) ? -y : y);
    return function (x: number, y: number) {
      const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
      x -= Math.floor(x); y -= Math.floor(y);
      const u = fade(x), v = fade(y);
      const aa = perm[perm[X] + Y], ab = perm[perm[X] + Y + 1];
      const ba = perm[perm[X + 1] + Y], bb = perm[perm[X + 1] + Y + 1];
      return lerp(v,
        lerp(u, grad(aa, x, y), grad(ba, x - 1, y)),
        lerp(u, grad(ab, x, y - 1), grad(bb, x - 1, y - 1)));
    };
  }

  const BASE_RGB = '7,10,14'; // matches --bg

  /* dim engineering palette for the nodes (rgb + peak alpha + radius frac) */
  const NODE_DEFS = [
    { c: [88, 150, 220], a: 0.10, r: 0.52 },   // blue
    { c: [140, 100, 222], a: 0.092, r: 0.46 }, // purple
    { c: [70, 132, 205], a: 0.078, r: 0.40 },  // blue
    { c: [150, 108, 232], a: 0.085, r: 0.44 }, // purple
    { c: [54, 170, 110], a: 0.045, r: 0.34 },  // green (rare/subtle)
    { c: [96, 158, 228], a: 0.072, r: 0.38 },  // blue
  ];

  const SPARK_RGB = [
    [121, 192, 255],
    [163, 113, 247],
    [121, 192, 255],
    [63, 208, 122],
  ];

  interface Spark {
    x: number; y: number; life: number; age: number;
    r: number; g: number; b: number; w: number;
  }

  let canvas: HTMLCanvasElement;

  $effect(() => {
    if (!canvas) return;
    const ctx2d = canvas.getContext('2d', { alpha: false });
    if (!ctx2d) return;
    const ctx = ctx2d; // non-null; narrowing held across the nested closures below
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, DPR = 1;
    const noise = makeNoise(20260604);
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    const nodes = NODE_DEFS.map((d, i) => ({ ...d, seed: i * 41.3 + 7 }));
    let sparks: Spark[] = [];
    let t = 0;

    const SCALE = 0.0017;     // flow-field zoom (smaller = broader swirls)
    const SPEED = 0.5;        // spark drift px/frame

    function sparkCount() {
      const a = (W * H) / (DPR * DPR);
      return Math.max(36, Math.min(150, Math.round(a / 11000)));
    }
    function spawnSpark(p: Partial<Spark>): Spark {
      p.x = Math.random() * W;
      p.y = Math.random() * H;
      p.life = 140 + Math.random() * 360;
      p.age = Math.random() * p.life;
      const c = SPARK_RGB[(Math.random() * SPARK_RGB.length) | 0];
      p.r = c[0]; p.g = c[1]; p.b = c[2];
      p.w = Math.random() < 0.2 ? 1.5 : 0.8;
      return p as Spark;
    }

    function resize() {
      DPR = Math.min(1.5, window.devicePixelRatio || 1);
      W = Math.floor(window.innerWidth * DPR);
      H = Math.floor(window.innerHeight * DPR);
      canvas.width = W; canvas.height = H;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      sparks = [];
      const n = sparkCount();
      for (let i = 0; i < n; i++) sparks.push(spawnSpark({}));
    }

    function angleAt(x: number, y: number) {
      const n =
        noise(x * SCALE, y * SCALE + t) * 1.0 +
        noise(x * SCALE * 2.4 + 40, y * SCALE * 2.4 - t * 0.6) * 0.4;
      return n * Math.PI * 1.8;
    }

    function step() {
      const maxDim = Math.max(W, H);

      // 1 ─ base wash
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgb(' + BASE_RGB + ')';
      ctx.fillRect(0, 0, W, H);

      // pointer easing (always, so it glides in/out)
      ptr.x += (ptr.tx - ptr.x) * 0.07;
      ptr.y += (ptr.ty - ptr.y) * 0.07;

      // 2 ─ luminous nodes (broad slow flow)
      ctx.globalCompositeOperation = 'lighter';
      for (const o of nodes) {
        const nx = noise(o.seed, t * 0.6);
        const ny = noise(o.seed + 53.1, t * 0.6 + 21);
        const cx = (0.5 + nx * 0.62) * W;
        const cy = (0.5 + ny * 0.62) * H;
        const rad = o.r * maxDim;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${o.c[0]},${o.c[1]},${o.c[2]},${o.a})`);
        g.addColorStop(0.6, `rgba(${o.c[0]},${o.c[1]},${o.c[2]},${o.a * 0.22})`);
        g.addColorStop(1, `rgba(${o.c[0]},${o.c[1]},${o.c[2]},0)`);
        ctx.fillStyle = g;
        // fill only the node's bounding box (clamped) to cut overdraw
        const x0 = Math.max(0, cx - rad), y0 = Math.max(0, cy - rad);
        const x1 = Math.min(W, cx + rad), y1 = Math.min(H, cy + rad);
        ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
      }

      // 3 ─ pointer glow
      if (ptr.active) {
        const rad = 200 * DPR;
        const g = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, rad);
        g.addColorStop(0, 'rgba(150,176,255,0.07)');
        g.addColorStop(1, 'rgba(150,176,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(ptr.x - rad, ptr.y - rad, rad * 2, rad * 2);
      }

      // 4 ─ drifting sparks (fine data-stream texture)
      const R = 190 * DPR, R2 = R * R;
      for (let i = 0; i < sparks.length; i++) {
        const p = sparks[i];
        let a = angleAt(p.x, p.y);
        if (ptr.active) {
          const dx = p.x - ptr.x, dy = p.y - ptr.y, d2 = dx * dx + dy * dy;
          if (d2 < R2) a += (1 - Math.sqrt(d2) / R) * 1.7;   // gentle swirl
        }
        const px = p.x, py = p.y;
        p.x += Math.cos(a) * SPEED * DPR;
        p.y += Math.sin(a) * SPEED * DPR;
        p.age++;

        const env = Math.sin(Math.min(1, p.age / p.life) * Math.PI);
        const alpha = 0.5 * env;
        ctx.strokeStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
        ctx.lineWidth = p.w * DPR;
        ctx.beginPath();
        ctx.moveTo(px, py);
        // a short tail in the travel direction reads as motion
        ctx.lineTo(p.x - Math.cos(a) * 7 * DPR, p.y - Math.sin(a) * 7 * DPR);
        ctx.stroke();

        if (p.age > p.life || p.x < -30 || p.x > W + 30 || p.y < -30 || p.y > H + 30) {
          spawnSpark(p);
        }
      }

      t += 0.0016;   // global slow evolution
    }

    let raf = 0, running = true;
    function loop() { if (!running) return; step(); raf = requestAnimationFrame(loop); }

    function onMove(e: PointerEvent) {
      ptr.tx = e.clientX * DPR; ptr.ty = e.clientY * DPR;
      if (!ptr.active) { ptr.x = ptr.tx; ptr.y = ptr.ty; }
      ptr.active = true;
    }
    function onLeave() { ptr.active = false; }
    function onVisible() {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!reduce && !running) { running = true; loop(); }
    }

    resize();
    window.addEventListener('resize', resize);

    if (reduce) {
      for (let k = 0; k < 60; k++) step();   // settle to a calm static frame
    } else {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onMove, { passive: true });
      window.addEventListener('pointerleave', onLeave);
      document.addEventListener('visibilitychange', onVisible);
      loop();
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisible);
    };
  });
</script>

<div class="backdrop" aria-hidden="true">
  <canvas bind:this={canvas} class="backdrop-canvas"></canvas>
  <div class="backdrop-grid"></div>
  <div class="backdrop-veil"></div>
</div>
