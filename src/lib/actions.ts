/**
 * Svelte action that fires a callback once when the element enters the viewport.
 * Useful for triggering section-level reveal animations.
 */
export function observeOnce(node: HTMLElement, callback: () => void) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        callback();
        observer.disconnect();
      }
    },
    { threshold: 0.15 }
  );
  observer.observe(node);
  return { destroy: () => observer.disconnect() };
}

/**
 * Svelte action that adds a project title to the provided Set once
 * the element enters the viewport. Enables per-card staggered reveals.
 *
 * Usage: use:observeProject={{ visibleProjects, title }}
 */
export function observeProject(
  node: HTMLElement,
  params: { title: string; onVisible: (title: string) => void }
) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        params.onVisible(params.title);
        observer.disconnect();
      }
    },
    { threshold: 0.15 }
  );
  observer.observe(node);
  return { destroy: () => observer.disconnect() };
}