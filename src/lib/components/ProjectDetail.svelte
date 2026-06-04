<script lang="ts">
  import {
    projects,
    STATUS_META,
    LAYER_COLOR,
    LAYER_ORDER,
    LAYER_LABEL,
    type Project,
    type TechLayer,
  } from '../data.js';
  import { router } from '../router.svelte.js';

  interface Props {
    project: Project | null;
  }

  let { project }: Props = $props();

  const all = projects;

  let idx = $derived(project ? all.findIndex((p) => p.slug === project.slug) : -1);
  let prev = $derived(all[(idx - 1 + all.length) % all.length]);
  let next = $derived(all[(idx + 1) % all.length]);

  // group the tech stack into ordered architecture layers
  let byLayer = $derived.by(() => {
    if (!project) return [] as { layer: TechLayer; items: string[] }[];
    const m = {} as Record<TechLayer, string[]>;
    project.techStack.forEach((t) => {
      (m[t.layer] = m[t.layer] ?? []).push(t.name);
    });
    return LAYER_ORDER.filter((l) => m[l]).map((l) => ({ layer: l, items: m[l] }));
  });

  function goHome() { router.navigate('/'); }
  function navigate(slug: string) { router.navigate(`/project/${slug}`); }

  // always start a detail page at the top
  $effect(() => {
    project?.slug;
    window.scrollTo(0, 0);
  });
</script>

{#if !project}
  <main class="detail wrap">
    <div class="notfound">
      <div class="code">404</div>
      <p style="color: var(--ink-dim); margin: 16px 0 26px">// project not found in store</p>
      <button class="btn btn-primary" onclick={goHome}>← BACK TO INDEX</button>
    </div>
  </main>
{:else}
  <main class="detail wrap">
    <button class="dt-back" onclick={goHome}><span class="a">←</span> BACK TO INDEX</button>

    <div class="dt-head">
      <div class="dt-meta">
        <span>PROJECT {String(idx).padStart(2, '0')} / {String(all.length - 1).padStart(2, '0')}</span>
        <span>· {project.year}</span>
        <span class="badge"><span class="led {STATUS_META[project.status].cls}"></span>{STATUS_META[project.status].word}</span>
      </div>
      <h1 class="dt-title">{project.title}</h1>
      <p class="dt-desc">{project.description}</p>
      <div class="dt-tags">
        {#each project.tags as t (t)}
          <span class="t">{t}</span>
        {/each}
      </div>
      <div class="dt-links">
        <button class="btn btn-primary" onclick={() => window.open(project.link, '_blank')}>
          VIEW LIVE <span class="ar">↗</span>
        </button>
        <button class="btn btn-ghost" onclick={goHome}>← ALL WORK</button>
      </div>
    </div>

    <div class="dt-body">
      <div class="dt-col-l">
        <div class="dt-h"><span class="ix">[</span>OVERVIEW<span class="ix">]</span></div>
        <div class="dt-over">
          <p>{project.overview}</p>
        </div>

        <div class="dt-h" style="margin-top: 30px"><span class="ix">[</span>HIGHLIGHTS<span class="ix">]</span></div>
        <ul class="hl">
          {#each project.highlights as h, i (h)}
            <li><span class="n">{String(i + 1).padStart(2, '0')}</span><span>{h}</span></li>
          {/each}
        </ul>
      </div>

      <div class="dt-col-r">
        <div class="dt-h"><span class="ix">[</span>TECH STACK<span class="ix">]</span></div>
        <div class="stk">
          {#each project.techStack as t (t.name)}
            <div class="stk-row">
              <span class="nm"><span class="stk-dot" style="background: {LAYER_COLOR[t.layer]}"></span>{t.name}</span>
              <span class="rl">{t.role}</span>
              <span class="ly" style="color: {LAYER_COLOR[t.layer]}">{t.layer}</span>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- system architecture diagram -->
    <div class="arch">
      <div class="arch-h">
        <span>FIG.01 — SYSTEM ARCHITECTURE</span>
        <span class="live"><span class="led live"></span>DATA FLOW</span>
      </div>
      <div class="arch-flow">
        {#each byLayer as node, i (node.layer)}
          <div class="anode" style="border-top-color: {LAYER_COLOR[node.layer]}">
            <div class="lh" style="color: {LAYER_COLOR[node.layer]}">
              <span class="stk-dot" style="background: {LAYER_COLOR[node.layer]}"></span>
              {LAYER_LABEL[node.layer]}
            </div>
            {#each node.items as it (it)}
              <div class="it">{it}</div>
            {/each}
          </div>
          {#if i < byLayer.length - 1}
            <div class="aconn">
              <span class="wire h"></span>
              <span class="pulse h" style="animation-delay: {i * 0.5}s"></span>
            </div>
          {/if}
        {/each}
      </div>
    </div>

    <nav class="dt-nav">
      <button onclick={() => navigate(prev.slug)}>
        <span class="k">← PREV</span><span class="v">{prev.title}</span>
      </button>
      <button class="next" onclick={() => navigate(next.slug)}>
        <span class="k">NEXT →</span><span class="v">{next.title}</span>
      </button>
    </nav>
  </main>
{/if}
