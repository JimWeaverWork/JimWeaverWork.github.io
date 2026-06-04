/**
 * Svelte action: reveal-on-scroll.
 *
 * Adds the `in` class to the node once it enters the viewport, driving the
 * transform-only `.reveal` / `.rule` transitions in app.css.
 *
 * Robust by design (ported from the prototype's `useReveal`): an immediate
 * rect check + rAF + scroll fallback + safety timeout guarantee content is
 * never left stuck hidden — even on instant anchor jumps or throttled tabs.
 */
export function reveal(node: HTMLElement, opts: { threshold?: number; rootMargin?: string } = {}) {
  let done = false;

  const show = () => {
    if (done) return;
    done = true;
    node.classList.add('in');
    cleanup();
  };

  const check = () => {
    const r = node.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh * 0.9 && r.bottom > 0) show();
  };

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) show(); }),
    { threshold: opts.threshold ?? 0.12, rootMargin: opts.rootMargin ?? '0px 0px -6% 0px' }
  );
  io.observe(node);

  const onScroll = () => check();
  window.addEventListener('scroll', onScroll, { passive: true });

  check();
  requestAnimationFrame(check);
  const safety = window.setTimeout(check, 600);

  function cleanup() {
    io.disconnect();
    window.removeEventListener('scroll', onScroll);
    window.clearTimeout(safety);
  }

  return { destroy: cleanup };
}
