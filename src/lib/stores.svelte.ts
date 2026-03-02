import { navSections, type NavSection } from './data';

/**
 * Global portfolio state using Svelte 5 runes.
 * Import this singleton wherever shared state is needed.
 */
function createPortfolioState() {
  let scrollY = $state(0);
  let activeSection = $state<NavSection>('home');
  let filterTag = $state<string | null>(null);

  function updateActiveSection() {
    for (const id of [...navSections].reverse()) {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop - 200) {
        activeSection = id;
        return;
      }
    }
    activeSection = 'home';
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  function setScrollY(y: number) {
    scrollY = y;
    updateActiveSection();
  }

  function toggleFilterTag(tag: string) {
    filterTag = filterTag === tag ? null : tag;
  }

  function clearFilterTag() {
    filterTag = null;
  }

  return {
    get scrollY() { return scrollY; },
    get activeSection() { return activeSection; },
    get filterTag() { return filterTag; },
    setScrollY,
    scrollToSection,
    toggleFilterTag,
    clearFilterTag
  };
}

export const portfolioState = createPortfolioState();