<script lang="ts">
  import { onMount } from 'svelte';
  import { identity } from '../data.js';
  import { portfolioState } from '../stores.svelte.js';

  const RESUME_URL = '/JimWeaver_Resume.pdf';

  // decrypt-scramble name reveal
  let display = $state(identity.name);
  let mounted = $state(false);

  // ticking system clock
  let now = $state(new Date());

  // static barcode pattern (generated once)
  const bars = Array.from({ length: 46 }, () => 1 + Math.floor(Math.random() * 4));

  onMount(() => {
    const boot = setTimeout(() => (mounted = true), 180);
    const clock = setInterval(() => (now = new Date()), 1000);
    return () => { clearTimeout(boot); clearInterval(clock); };
  });

  $effect(() => {
    if (!mounted) return;
    const text = identity.name;
    const glyphs = 'ABCDEFGHJKLMNPQRSTUVWXYZ#%&$@/\\<>*';
    let frame = 0;
    const total = text.length;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / 2);
      let s = '';
      for (let i = 0; i < total; i++) {
        if (text[i] === ' ') { s += ' '; continue; }
        s += i < revealed ? text[i] : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      display = s;
      if (revealed >= total) { clearInterval(id); display = text; }
    }, 30);
    return () => clearInterval(id);
  });

  const pad = (n: number) => String(n).padStart(2, '0');
  let hh = $derived(pad(now.getHours()));
  let mm = $derived(pad(now.getMinutes()));
  let ss = $derived(pad(now.getSeconds()));

  function openResume() {
    window.open(RESUME_URL, '_blank');
  }
</script>

<section class="hero wrap" id="top">
  <div class="hero-grid">
    <div class="hero-main">
      <div class="hero-tag">
        <span class="pn">P/N · JW—2026</span>
        <span class="sep"></span>
        <span>REV 4.0</span>
      </div>

      <h1 class="hero-name">
        {display.slice(0, 3)}<span class="lo">{display.slice(3)}</span>
      </h1>
      <div class="hero-role">{identity.role}<span class="caret"></span></div>
      <p class="hero-line">{identity.oneLiner}</p>

      <div class="hero-status">
        {#each identity.status as s (s.label)}
          <div class="chip-status">
            <span class="led {s.state}"></span>{s.label}
          </div>
        {/each}
      </div>

      <div class="hero-stack">
        <span class="lbl">STACK //</span>
        {#each identity.stack as s (s)}
          <span class="chip">{s}</span>
        {/each}
      </div>

      <div class="hero-cta">
        <button class="btn btn-primary" onclick={() => portfolioState.scrollToSection('projects')}>
          VIEW WORK <span class="ar">→</span>
        </button>
        <button class="btn btn-ghost" onclick={openResume}>
          <span class="ar">↓</span> RESUME.PDF
        </button>
        <button class="btn btn-ghost" onclick={() => portfolioState.scrollToSection('contact')}>
          CONTACT
        </button>
      </div>

      <div class="scroll-hint">
        <span class="arw">▼</span> SCROLL TO BOOT &nbsp;·&nbsp; 00 → 04
      </div>
    </div>

    <aside class="hero-side">
      <div class="side-head">
        <span>SPEC SHEET</span>
        <span class="dots"><i></i><i></i><i></i></span>
      </div>
      <div class="side-body">
        <div class="spec-row"><span class="k">HANDLE</span><span class="v">@{identity.handle}</span></div>
        <div class="spec-row"><span class="k">ROLE</span><span class="v">Backend / Systems</span></div>
        <div class="spec-row"><span class="k">LOCATION</span><span class="v">{identity.location}</span></div>
        <div class="spec-row"><span class="k">STUDYING</span><span class="v">Electrical &amp; Computer Eng.</span></div>
        <div class="spec-row"><span class="k">FOCUS</span><span class="v">Distributed systems · DBs</span></div>
        <div class="spec-row"><span class="k">AVAIL</span><span class="v"><span class="a">● open to work</span></span></div>
        <div class="barcode">
          {#each bars as w, i (i)}
            <i style="width: {w}px; opacity: {i % 3 === 0 ? 0.55 : 0.9}"></i>
          {/each}
        </div>
      </div>
      <div class="side-clock">
        <div>
          <div class="z">SYS&nbsp;TIME</div>
          <div class="t tnum">{hh}:{mm}<span style="color: var(--ink-faint); font-size: 16px">:{ss}</span></div>
        </div>
        <span class="led live"></span>
      </div>
    </aside>
  </div>
</section>
