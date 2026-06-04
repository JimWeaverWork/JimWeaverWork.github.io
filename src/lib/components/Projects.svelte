<script lang="ts">
  import { projects, STATUS_META } from '../data.js';
  import { router } from '../router.svelte.js';

  type SortKey = 'year' | 'title' | 'status';

  const all = projects;
  const allTags = [...new Set(all.flatMap((p) => p.tags))];

  let picked = $state<string[]>([]);
  let sort = $state<SortKey>('year');
  let running = $state(false);
  let execMs = $state('0.40');

  function toggle(t: string) {
    picked = picked.includes(t) ? picked.filter((x) => x !== t) : [...picked, t];
  }
  function clear() { picked = []; }
  function cycleSort() {
    sort = sort === 'year' ? 'title' : sort === 'title' ? 'status' : 'year';
  }

  let results = $derived.by(() => {
    const r = picked.length ? all.filter((p) => picked.some((t) => p.tags.includes(t))) : all.slice();
    if (sort === 'year') r.sort((a, b) => b.year.localeCompare(a.year));
    else if (sort === 'title') r.sort((a, b) => a.title.localeCompare(b.title));
    else r.sort((a, b) => a.status.localeCompare(b.status));
    return r;
  });

  let sig = $derived(picked.join(',') + '|' + sort);
  let sortLabel = $derived(sort === 'year' ? 'year DESC' : sort === 'title' ? 'title ASC' : 'status ASC');

  // simulate query execution whenever the query changes
  $effect(() => {
    sig; // track
    running = true;
    execMs = (0.18 + Math.random() * 0.9).toFixed(2);
    const t = setTimeout(() => (running = false), 380);
    return () => clearTimeout(t);
  });

  function open(slug: string) {
    router.navigate(`/project/${slug}`);
  }
</script>

<section class="section wrap" id="projects">
  <div class="section-head">
    <span class="section-idx">02</span>
    <h2 class="section-title">Work</h2>
    <span class="section-meta">// query the project store</span>
  </div>

  <div class="qbox">
    <div class="qbox-head">
      <span>QUERY CONSOLE</span>
      <span>projects.db</span>
      <span class="live"><span class="led live"></span>CONNECTED</span>
    </div>

    <div class="qsql">
      <span class="kw">SELECT</span> <span class="mut">*</span> <span class="kw">FROM</span> <span class="fn">projects</span><br />
      {#if picked.length > 0}
        <span class="kw">WHERE</span> <span class="mut">tag</span> <span class="kw">IN</span> <span class="mut">(</span>
        {#each picked as t (t)}
          <button class="pred" onclick={() => toggle(t)} title="remove predicate">
            '{t}' <span class="x">✕</span>
          </button>
        {/each}
        <span class="mut">)</span><br />
      {:else}
        <span class="mut">/* no filter — full table scan */</span><br />
      {/if}
      <span class="kw">ORDER BY</span> <span class="mut">{sortLabel}</span><span class="caret"></span>
    </div>

    <div class="qpalette">
      <span class="lbl">+WHERE</span>
      {#each allTags as t (t)}
        <button class="qtag" class:on={picked.includes(t)} onclick={() => toggle(t)}>{t}</button>
      {/each}
      <div class="qctrl">
        <button class="qbtn" onclick={cycleSort}>ORDER BY: {sort.toUpperCase()} ↕</button>
        <button class="qbtn" onclick={clear} disabled={!picked.length}>CLEAR</button>
      </div>
    </div>
  </div>

  <div class="qstatus">
    {#if running}
      <span class="led active"></span><span class="run">executing query…</span>
    {:else}
      <span class="ok">▸ {results.length} {results.length === 1 ? 'row' : 'rows'} returned</span>
      <span>·</span><span class="tnum">{execMs}ms</span>
      <span>·</span><span>sorted by {sortLabel.toLowerCase()}</span>
    {/if}
  </div>

  {#if !running}
    {#key sig}
      <div class="rows">
        {#if results.length === 0}
          <div class="qempty">
            0 rows match that predicate. <button onclick={clear}>reset query</button>
          </div>
        {:else}
          {#each results as p, i (p.slug)}
            <div class="prow" style="animation-delay: {i * 70}ms" onclick={() => open(p.slug)} role="presentation">
              <div class="prow-top">
                <span class="ix">{String(i).padStart(2, '0')}</span>
                <span class="nm">{p.title}</span>
                <span class="lead"></span>
                <span class="yr tnum">{p.year}</span>
                <span class="badge"><span class="led {STATUS_META[p.status].cls}"></span>{STATUS_META[p.status].word}</span>
              </div>
              <p class="desc">{p.description}</p>
              <div class="prow-bot">
                {#each p.tags as t (t)}
                  <span class="ptag" class:match={picked.includes(t)}>{t}</span>
                {/each}
                <div class="prow-act">
                  <button class="pact" onclick={(e) => { e.stopPropagation(); open(p.slug); }}>DETAILS →</button>
                  <button class="pact live" onclick={(e) => { e.stopPropagation(); window.open(p.link, '_blank'); }}>VIEW LIVE ↗</button>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    {/key}
  {/if}
</section>
