<script lang="ts">
  import { onMount } from 'svelte';
  import { portfolioState } from './lib/stores.svelte.js';
  import { router } from './lib/router.svelte.js';
  import { projects } from './lib/data.js';

  import Header from './lib/components/Header.svelte';
  import Hero from './lib/components/Hero.svelte';
  import About from './lib/components/About.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Skills from './lib/components/Skills.svelte';
  import Contact from './lib/components/Contact.svelte';
  import Footer from './lib/components/Footer.svelte';
  import ProjectDetail from './lib/components/ProjectDetail.svelte';

  // Register the hashchange listener so the router stays in sync with
  // browser back/forward navigation.
  onMount(() => {
    window.addEventListener('hashchange', router.handleHashChange);
    return () => window.removeEventListener('hashchange', router.handleHashChange);
  });

  // Derive the active project from the current path.
  // Returns null  → show home page
  // Returns Project → show project detail page
  let activeProject = $derived.by(() => {
    const match = router.currentPath.match(/^\/project\/(.+)$/);
    if (!match) return null;
    return projects.find(p => p.slug === match[1]) ?? null;
  });

  let isHome = $derived(router.currentPath === '/' || !router.currentPath.startsWith('/project/'));
</script>

<!-- Only track scroll for active-section highlighting when on the home page -->
<svelte:window onscroll={isHome ? () => portfolioState.setScrollY(window.scrollY) : undefined} />

<Header />

{#if isHome}
  <main>
    <Hero />
    <About />
    <Projects />
    <Skills />
    <Contact />
  </main>
{:else}
  <ProjectDetail project={activeProject} />
{/if}

<Footer />

<style>
  main {
    position: relative;
  }
</style>
