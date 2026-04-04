/**
 * Minimal hash-based client-side router.
 * URL format:  #/              → home
 *              #/project/slug  → project detail page
 *
 * Works on any static host (GitHub Pages, Cloudflare Pages, etc.) because
 * nothing after the `#` is sent to the server.
 */

function createRouter() {
  function parsePath(): string {
    if (typeof window === 'undefined') return '/';
    return window.location.hash.replace(/^#/, '') || '/';
  }

  let currentPath = $state(parsePath());

  function navigate(path: string) {
    window.location.hash = path;
    currentPath = path;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  /** Call this from an `onMount` hashchange listener in App.svelte */
  function handleHashChange() {
    currentPath = parsePath();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  return {
    get currentPath() { return currentPath; },
    navigate,
    handleHashChange,
  };
}

export const router = createRouter();
