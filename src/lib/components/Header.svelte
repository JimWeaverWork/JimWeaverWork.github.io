<script lang="ts">
  import { portfolioState } from '../stores.svelte.js';
  import { navItems } from '../data.js';
  import { router } from '../router.svelte.js';

  let open = $state(false);

  let isDetail = $derived(router.currentPath.startsWith('/project/'));

  function go(id: string) {
    portfolioState.scrollToSection(id);
    open = false;
  }

  function goHome() {
    router.navigate('/');
    open = false;
  }
</script>

<!-- Fixed engineering frame: hairline edges + corner ticks + vertical label -->
<div class="frame" aria-hidden="true">
  <span class="edge t"></span><span class="edge b"></span>
  <span class="edge l"></span><span class="edge r"></span>
  <span class="corner tl"></span><span class="corner tr"></span>
  <span class="corner bl"></span><span class="corner br"></span>
  <span class="vlabel">JIM_WEAVER · PORTFOLIO · MMXXVI</span>
</div>

<!-- Scroll progress bar -->
<div
  class="nav-prog"
  style="width: calc((100% - var(--frame) * 2) * {portfolioState.scrollProgress})"
></div>

<nav class="nav">
  <button class="nav-logo" onclick={goHome}>
    <span class="led live"></span>
    <span class="c">jim</span><span class="b">_weaver</span>
  </button>

  {#if isDetail}
    <button class="nav-cta" onclick={goHome}>← BACK TO INDEX</button>
  {:else}
    <div class="nav-right desk">
      {#each navItems as s (s.id)}
        <button
          class="nav-link"
          class:active={portfolioState.activeSection === s.id}
          onclick={() => go(s.id)}
        >
          <span class="n">{s.idx}</span>{s.label}
        </button>
      {/each}
      <button class="nav-cta" onclick={() => go('contact')}>CONTACT</button>
    </div>

    <button
      class="nav-burger"
      class:open
      aria-label="menu"
      aria-expanded={open}
      onclick={() => (open = !open)}
    >
      <span></span><span></span><span></span>
    </button>
  {/if}
</nav>

{#if open && !isDetail}
  <div class="nav-drawer">
    {#each navItems as s (s.id)}
      <button
        class="nav-link"
        class:active={portfolioState.activeSection === s.id}
        onclick={() => go(s.id)}
      >
        <span class="n">{s.idx}</span>{s.label}
      </button>
    {/each}
  </div>
{/if}
