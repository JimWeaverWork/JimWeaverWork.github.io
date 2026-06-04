<script lang="ts">
  import { onMount } from 'svelte';
  import { portfolioState } from './lib/stores.svelte.js';
  import { router } from './lib/router.svelte.js';
  import { projects } from './lib/data.js';

  import Backdrop from './lib/components/Backdrop.svelte';
  import Header from './lib/components/Header.svelte';
  import Hero from './lib/components/Hero.svelte';
  import About from './lib/components/About.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Skills from './lib/components/Skills.svelte';
  import Contact from './lib/components/Contact.svelte';
  import ProjectDetail from './lib/components/ProjectDetail.svelte';

  // Keep the router in sync with browser back/forward navigation.
  onMount(() => {
    window.addEventListener('hashchange', router.handleHashChange);
    return () => window.removeEventListener('hashchange', router.handleHashChange);
  });

  // Derive the active project from the current path.
  //   null    → home page
  //   Project → project detail page
  let activeProject = $derived.by(() => {
    const match = router.currentPath.match(/^\/project\/(.+)$/);
    if (!match) return null;
    return projects.find((p) => p.slug === match[1]) ?? null;
  });

  let isHome = $derived(!router.currentPath.startsWith('/project/'));
</script>

<!-- Track scroll for progress bar + active-section highlighting on the home page -->
<svelte:window onscroll={isHome ? () => portfolioState.setScrollY(window.scrollY) : undefined} />

<Backdrop />

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
