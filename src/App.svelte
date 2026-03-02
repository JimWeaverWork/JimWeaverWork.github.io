<script lang="ts">
  import { portfolioState } from './lib/stores.svelte.js';
  import Header from './lib/components/Header.svelte';
  import Hero from './lib/components/Hero.svelte';
  import About from './lib/components/About.svelte';
  import Projects from './lib/components/Projects.svelte';
  import Skills from './lib/components/Skills.svelte';
  import Contact from './lib/components/Contact.svelte';
  import Footer from './lib/components/Footer.svelte';
</script>

<svelte:window onscroll={() => portfolioState.setScrollY(window.scrollY)} />

<Header />

<main>
  <Hero />
  <About />
  <Projects />
  <Skills />
  <Contact />
</main>

<Footer />

<style>
  main {
    position: relative;
  }
</style>