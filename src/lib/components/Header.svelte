<script lang="ts">
  import { portfolioState } from '../stores.svelte.js';
  import { navSections } from '../data.js';

  let menuOpen = $state(false);

  function handleNavClick(id: string) {
    portfolioState.scrollToSection(id);
    menuOpen = false;
  }
</script>

<header class:scrolled={portfolioState.scrollY > 50}>
  <nav>
    <a href="/" class="logo">Jim Weaver</a>

    <!-- Desktop nav -->
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

    <!-- Hamburger button (mobile only) -->
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
  </nav>

  <!-- Mobile dropdown -->
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
  }

  .logo {
    font-size: 1.5em;
    font-weight: 700;
    color: #79c0ff;
    text-decoration: none;
  }

  .logo:hover {
    color: #a371f7;
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
  }

  .nav-btn.active::after {
    width: 100%;
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