<script lang="ts">
  import { portfolioState } from '../stores.svelte.js';
  import { navSections } from '../data.js';
  import { router } from '../router.svelte.js';

  let menuOpen = $state(false);

  let isDetailPage = $derived(router.currentPath.startsWith('/project/'));

  function handleNavClick(id: string) {
    portfolioState.scrollToSection(id);
    menuOpen = false;
  }

  function goHome() {
    router.navigate('/');
    menuOpen = false;
  }
</script>

<header class:scrolled={portfolioState.scrollY > 50}>
  <nav>
    <button class="logo" onclick={goHome}>Jim Weaver</button>

    {#if isDetailPage}
      <!-- On a project detail page show a single back link instead of section nav -->
      <ul class="nav-links">
        <li>
          <button class="nav-btn back-nav" onclick={goHome}>
            ← Back to Portfolio
          </button>
        </li>
      </ul>

      <!-- Mobile: same back button via hamburger -->
      <button
        class="hamburger"
        onclick={() => menuOpen = !menuOpen}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span class:open={menuOpen}></span>
        <span class:open={menuOpen}></span>
        <span class:open={menuOpen}></span>
      </button>

      {#if menuOpen}
        <ul class="mobile-menu">
          <li>
            <button class="nav-btn mobile-nav-btn" onclick={goHome}>
              ← Back to Portfolio
            </button>
          </li>
        </ul>
      {/if}

    {:else}
      <!-- Regular home-page section navigation -->
      <ul class="nav-links">
        {#each navSections as id}
          <li>
            <button
              onclick={() => handleNavClick(id)}
              class="nav-btn"
              class:active={portfolioState.activeSection === id}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          </li>
        {/each}
      </ul>

      <button
        class="hamburger"
        onclick={() => menuOpen = !menuOpen}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span class:open={menuOpen}></span>
        <span class:open={menuOpen}></span>
        <span class:open={menuOpen}></span>
      </button>

      {#if menuOpen}
        <ul class="mobile-menu">
          {#each navSections as id}
            <li>
              <button
                onclick={() => handleNavClick(id)}
                class="nav-btn mobile-nav-btn"
                class:active={portfolioState.activeSection === id}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    {/if}

  </nav>
</header>

<style>
  header {
    background-color: #010409;
    border-bottom: 1px solid #30363d;
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  header.scrolled {
    background-color: rgba(1, 4, 9, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.4);
  }

  nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .logo {
    font-size: 1.5em;
    font-weight: 700;
    color: #79c0ff;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-family: inherit;
    transition: color 0.3s ease;
    box-shadow: none;
  }

  .logo:hover {
    color: #a371f7;
    border-color: transparent;
    box-shadow: none;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
  }

  .nav-btn {
    background: none;
    border: none;
    color: #8b949e;
    cursor: pointer;
    font-size: 1em;
    padding: 0.3em 0;
    font-weight: 500;
    position: relative;
    transition: color 0.3s ease;
    box-shadow: none;
  }

  .nav-btn::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #79c0ff, #a371f7);
    transition: width 0.3s ease;
  }

  .nav-btn.active,
  .nav-btn:hover {
    color: #79c0ff;
    border-color: transparent;
    box-shadow: none;
  }

  .nav-btn.active::after {
    width: 100%;
  }

  .back-nav {
    color: #79c0ff;
  }

  .back-nav:hover {
    color: #a371f7;
  }

  /* ── Hamburger ── */
  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.4em;
    width: 36px;
    height: 36px;
    box-shadow: none;
  }

  .hamburger:hover {
    border-color: transparent;
    box-shadow: none;
  }

  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: #8b949e;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .hamburger span.open:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
    background: #a371f7;
  }

  .hamburger span.open:nth-child(2) {
    opacity: 0;
  }

  .hamburger span.open:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
    background: #a371f7;
  }

  /* ── Mobile dropdown menu ── */
  .mobile-menu {
    list-style: none;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #30363d;
    padding: 0.5rem 0;
    margin-top: 0.5rem;
    width: 100%;
  }

  .mobile-nav-btn {
    width: 100%;
    text-align: left;
    padding: 0.75em 1rem;
    font-size: 1em;
    border-radius: 6px;
  }

  .mobile-nav-btn:hover {
    background: #161b22;
    border-color: transparent;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    header {
      padding: 0.85rem 1.25rem;
    }

    .nav-links {
      display: none;
    }

    .hamburger {
      display: flex;
    }
  }
</style>
