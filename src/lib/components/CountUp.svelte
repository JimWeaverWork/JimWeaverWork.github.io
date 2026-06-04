<script lang="ts">
  import { untrack } from 'svelte';

  // Counts up to `to` when scrolled into view. Initialises to the final value
  // so it is always correct even if rAF is throttled (background tab).
  interface Props {
    to: number;
    dur?: number;
    pad?: number;
    suffix?: string;
  }

  let { to, dur = 1100, pad = 0, suffix = '' }: Props = $props();

  // Start at the final value; the animation rewinds to 0 once it scrolls in.
  let val = $state(untrack(() => to));
  let el: HTMLSpanElement;

  $effect(() => {
    const target = to; // snapshot; effect re-runs if the prop changes
    let stop: (() => void) | undefined;

    const animate = () => {
      let raf = 0;
      let start = 0;
      const step = (t: number) => {
        if (!start) start = t;
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        val = Math.round(eased * target);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      const safety = window.setTimeout(() => (val = target), dur + 400);
      return () => { cancelAnimationFrame(raf); window.clearTimeout(safety); };
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          stop = animate();
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => { io.disconnect(); stop?.(); };
  });

  let display = $derived(String(val).padStart(pad, '0') + suffix);
</script>

<span bind:this={el} class="tnum">{display}</span>
