import { navSections, type NavSection } from './data';

/** Height to offset section scrolling by so the fixed nav doesn't cover headings. */
const NAV_OFFSET = 80;

/**
 * Global portfolio state using Svelte 5 runes.
 * Import this singleton wherever shared state is needed.
 */
function createPortfolioState() {
  let scrollY = $state(0);
  let scrollProgress = $state(0);
  let activeSection = $state<NavSection>('about');

  function updateActiveSection() {
    // Mirror the prototype's scroll-spy: the active section is the last one
    // whose top has crossed 40% of the viewport.
    let cur: NavSection = 'about';
    for (const id of navSections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
        cur = id;
      }
    }
    activeSection = cur;
  }

  function setScrollY(y: number) {
    scrollY = y;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    scrollProgress = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
    updateActiveSection();
  }

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  return {
    get scrollY() { return scrollY; },
    get scrollProgress() { return scrollProgress; },
    get activeSection() { return activeSection; },
    setScrollY,
    scrollToSection,
  };
}

export const portfolioState = createPortfolioState();
