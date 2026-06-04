<script lang="ts">
  import { aboutMe, terminal, projects } from '../data.js';
  import { reveal } from '../actions.js';

  type Line = { type: 'sys' | 'cmd' | 'out' | 'err'; text: string };

  const SUGGESTIONS = ['help', 'whoami', 'stack', 'interests', 'projects', 'contact', 'uptime', 'clear'];

  const cfg = terminal;

  let hist = $state<Line[]>([
    ...cfg.motd.map((t): Line => ({ type: 'sys', text: t })),
    { type: 'cmd', text: 'whoami' },
    ...cfg.commands.whoami.lines.map((t): Line => ({ type: 'out', text: t })),
  ]);
  let val = $state('');
  let bodyEl: HTMLDivElement;
  let inputEl: HTMLInputElement;

  function exec(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === 'clear') { hist = []; return; }

    const add: Line[] = [{ type: 'cmd', text: raw.trim() }];
    if (cmd === 'projects' || cmd === 'ls') {
      add.push({ type: 'out', text: `${projects.length} projects on record:` });
      projects.forEach((p, i) =>
        add.push({
          type: 'out',
          text: `  [${String(i).padStart(2, '0')}] ${p.title.padEnd(18)} ${p.tags.slice(0, 3).join(' · ')}`,
        })
      );
      add.push({ type: 'sys', text: '→ scroll to [02] WORK to query the full set' });
    } else if (cfg.commands[cmd]) {
      cfg.commands[cmd].lines.forEach((t) => add.push({ type: 'out', text: t }));
    } else {
      add.push({ type: 'err', text: `command not found: ${cmd} — try 'help'` });
    }
    hist = [...hist, ...add];
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'Enter') { exec(val); val = ''; }
  }

  function runSuggestion(s: string) {
    exec(s);
    inputEl?.focus();
  }

  // keep the terminal pinned to the latest line
  $effect(() => {
    hist.length;
    if (bodyEl) bodyEl.scrollTop = bodyEl.scrollHeight;
  });
</script>

<section class="section wrap" id="about">
  <div class="section-head">
    <span class="section-idx">01</span>
    <h2 class="section-title">About</h2>
    <span class="section-meta">// cat profile.md</span>
  </div>

  <div class="about-grid">
    <div class="reveal" use:reveal>
      <p class="about-lead">
        I'm Jim — a <span class="hl">backend-focused developer</span> who loves engineering systems
        that are scalable, reliable, and operate at speed.
      </p>
      {#each aboutMe.paragraphs as p (p)}
        <p class="about-p">{p}</p>
      {/each}
      <div class="about-facts">
        {#each aboutMe.facts as f (f.k)}
          <div class="fact">
            <span class="k">{f.k}</span><span class="v">{f.v}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="reveal d2" use:reveal>
      <div class="term" onclick={() => inputEl?.focus()} role="presentation">
        <div class="term-bar">
          <span class="d r"></span><span class="d y"></span><span class="d g"></span>
          <span class="ttl">jim@portfolio: ~</span>
          <span class="live"><span class="led live"></span>ONLINE</span>
        </div>
        <div class="term-body" bind:this={bodyEl}>
          {#each hist as l, i (i)}
            <div class="term-line {l.type}">
              {#if l.type === 'cmd'}<span class="pr">❯</span>{/if}
              <span class="tx">{l.text}</span>
            </div>
          {/each}
          <div class="term-input">
            <span class="pr">❯</span>
            <input
              bind:this={inputEl}
              bind:value={val}
              onkeydown={onKey}
              spellcheck="false"
              autocomplete="off"
              aria-label="terminal input"
              placeholder="type a command…"
            />
          </div>
        </div>
        <div class="term-sugg">
          {#each SUGGESTIONS as s (s)}
            <button onclick={() => runSuggestion(s)}>{s}</button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
