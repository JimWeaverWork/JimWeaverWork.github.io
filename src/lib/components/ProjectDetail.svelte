<script lang="ts">
  import { onMount } from 'svelte';
  import { router } from '../router.svelte.js';
  import type { Project } from '../data.js';

  let { project }: { project: Project | null } = $props();

  // Fade-in on mount
  let visible = $state(false);
  onMount(() => {
    visible = true;
  });

  const statusLabel: Record<Project['status'], string> = {
    live: 'Live',
    'in-progress': 'In Progress',
    archived: 'Archived',
  };
</script>

<main class="detail-page">
  <div class="detail-container" class:visible>

    {#if !project}
      <!-- ── 404 ────────────────────────────────────────────────────── -->
      <div class="not-found">
        <h1>Project not found</h1>
        <p>That project doesn't exist (yet).</p>
        <button onclick={() => router.navigate('/')}>← Back to Portfolio</button>
      </div>

    {:else}
      <!-- ── Breadcrumb ─────────────────────────────────────────────── -->
      <nav class="breadcrumb" aria-label="breadcrumb">
        <button class="back-btn" onclick={() => router.navigate('/')}>
          ← Back to Portfolio
        </button>
        <span class="crumb-sep">/</span>
        <span class="crumb-current">{project.title}</span>
      </nav>

      <!-- ── Project header ─────────────────────────────────────────── -->
      <header class="detail-header">
        <div class="title-row">
          <h1 class="project-title">{project.title}</h1>
          <span class="status-badge status-{project.status}">
            {#if project.status === 'live'}
              <span class="status-dot"></span>
            {/if}
            {statusLabel[project.status]}
          </span>
        </div>

        <div class="tag-row">
          {#each project.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>

        <div class="action-row">
          <a href={project.link} target="_blank" rel="noopener noreferrer" class="btn-primary">
            View Live ↗
          </a>
          {#if project.repo}
            <a href={project.repo} target="_blank" rel="noopener noreferrer" class="btn-secondary">
              View Repo
            </a>
          {/if}
        </div>
      </header>

      <!-- ── Body ──────────────────────────────────────────────────── -->
      <div class="detail-body">

        <!-- Left column: Overview + Highlights -->
        <div class="detail-main">
          <section class="content-section">
            <h2>Overview</h2>
            <p class="overview-text">{project.overview}</p>
          </section>

          <section class="content-section">
            <h2>Key Highlights</h2>
            <ul class="highlights-list">
              {#each project.highlights as highlight}
                <li>{highlight}</li>
              {/each}
            </ul>
          </section>
        </div>

        <!-- Right column: Tech Stack -->
        <aside class="detail-aside">
          <div class="tech-card">
            <div class="tech-card-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="tech-card-title">tech-stack.json</span>
            </div>
            <div class="tech-card-body">
              {#each project.techStack as tech}
                <div class="tech-item">
                  <span class="tech-name">{tech.name}</span>
                  <span class="tech-role">{tech.role}</span>
                </div>
              {/each}
            </div>
          </div>
        </aside>

      </div>
    {/if}

  </div>
</main>

<style>
  /* ── Page wrapper ─────────────────────────────────────────────────── */
  .detail-page {
    min-height: calc(100vh - 65px);
    padding: 3rem 2rem 5rem;
    background-color: var(--background-color);
  }

  .detail-container {
    max-width: 960px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }

  .detail-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Breadcrumb ───────────────────────────────────────────────────── */
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
  }

  .back-btn {
    background: none;
    border: none;
    color: #79c0ff;
    font-size: 0.95em;
    cursor: pointer;
    padding: 0.3em 0.6em;
    border-radius: 6px;
    transition: color 0.2s ease, background 0.2s ease;
    box-shadow: none;
  }

  .back-btn:hover {
    color: #a371f7;
    background: #161b22;
    border-color: transparent;
    box-shadow: none;
  }

  .crumb-sep {
    color: #484f58;
    font-size: 0.9em;
  }

  .crumb-current {
    color: #8b949e;
    font-size: 0.9em;
    font-family: 'SF Mono', 'Fira Code', monospace;
  }

  /* ── Header ───────────────────────────────────────────────────────── */
  .detail-header {
    border-bottom: 1px solid #30363d;
    padding-bottom: 2rem;
    margin-bottom: 2.5rem;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .project-title {
    font-size: 2.6em;
    font-weight: 700;
    font-family: 'SF Mono', 'Fira Code', monospace;
    background: linear-gradient(135deg, #79c0ff 0%, #a371f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    line-height: 1.2;
  }

  /* ── Status badges ────────────────────────────────────────────────── */
  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    font-size: 0.78em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.3em 0.8em;
    border-radius: 20px;
    border: 1px solid;
    flex-shrink: 0;
  }

  .status-live {
    color: #3fb950;
    border-color: #3fb95040;
    background: #3fb95015;
  }

  .status-in-progress {
    color: #d29922;
    border-color: #d2992240;
    background: #d2992215;
  }

  .status-archived {
    color: #8b949e;
    border-color: #8b949e40;
    background: #8b949e15;
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3fb950;
    display: inline-block;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* ── Tag row ──────────────────────────────────────────────────────── */
  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .tag {
    display: inline-block;
    background-color: #161b22;
    color: #79c0ff;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85em;
    border: 1px solid #30363d;
  }

  /* ── Action buttons ───────────────────────────────────────────────── */
  .action-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-block;
    padding: 0.65em 1.6em;
    font-size: 0.95em;
    font-weight: 600;
    background: linear-gradient(135deg, #79c0ff 0%, #a371f7 100%);
    color: #0d1117;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.25s ease;
    border: none;
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, #a371f7 0%, #79c0ff 100%);
    box-shadow: 0 0 24px rgba(163, 113, 247, 0.45);
    transform: translateY(-2px);
    color: #0d1117;
  }

  .btn-secondary {
    display: inline-block;
    padding: 0.65em 1.6em;
    font-size: 0.95em;
    font-weight: 500;
    background: transparent;
    color: #c9d1d9;
    border: 1px solid #30363d;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.25s ease;
  }

  .btn-secondary:hover {
    border-color: #a371f7;
    color: #a371f7;
    transform: translateY(-2px);
    box-shadow: none;
  }

  /* ── Body layout ──────────────────────────────────────────────────── */
  .detail-body {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 2.5rem;
    align-items: start;
  }

  /* ── Content sections (left col) ─────────────────────────────────── */
  .content-section {
    margin-bottom: 2.5rem;
  }

  .content-section h2 {
    font-size: 1.1em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #8b949e;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
  }

  .content-section h2::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #79c0ff, #a371f7);
    border-radius: 2px;
  }

  .overview-text {
    color: #c9d1d9;
    line-height: 1.8;
    font-size: 1em;
    margin-bottom: 0;
  }

  /* ── Highlights list ──────────────────────────────────────────────── */
  .highlights-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0;
    margin: 0;
  }

  .highlights-list li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: #c9d1d9;
    line-height: 1.6;
    font-size: 0.97em;
    padding: 0.7em 1em;
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 8px;
    transition: border-color 0.2s ease;
  }

  .highlights-list li:hover {
    border-color: #79c0ff40;
  }

  .highlights-list li::before {
    content: '▸';
    color: #a371f7;
    flex-shrink: 0;
    font-size: 0.85em;
    margin-top: 0.1em;
  }

  /* ── Tech stack card (right col) ─────────────────────────────────── */
  .tech-card {
    background: #010409;
    border: 1px solid #30363d;
    border-radius: 12px;
    overflow: hidden;
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
    font-size: 0.88em;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
    position: sticky;
    top: 80px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .tech-card:hover {
    border-color: #a371f7;
    box-shadow: 0 12px 50px rgba(163, 113, 247, 0.15);
  }

  .tech-card-header {
    background: #161b22;
    border-bottom: 1px solid #30363d;
    padding: 0.65rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot.red    { background: #ff5f57; }
  .dot.yellow { background: #ffbd2e; }
  .dot.green  { background: #28c840; }

  .tech-card-title {
    margin-left: 0.6rem;
    color: #484f58;
    font-size: 0.82em;
    letter-spacing: 0.03em;
  }

  .tech-card-body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .tech-item {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    padding: 0.75rem 0.5rem;
    border-bottom: 1px solid #161b22;
    transition: background 0.15s ease;
  }

  .tech-item:last-child {
    border-bottom: none;
  }

  .tech-item:hover {
    background: #0d1117;
    border-radius: 6px;
  }

  .tech-name {
    color: #79c0ff;
    font-weight: 600;
    font-size: 0.95em;
  }

  .tech-role {
    color: #484f58;
    font-size: 0.82em;
    line-height: 1.4;
  }

  /* ── 404 ──────────────────────────────────────────────────────────── */
  .not-found {
    text-align: center;
    padding: 6rem 2rem;
  }

  .not-found h1 {
    color: #c9d1d9;
    margin-bottom: 0.5rem;
    -webkit-text-fill-color: #c9d1d9;
  }

  /* ── Responsive ───────────────────────────────────────────────────── */
  @media (max-width: 900px) {
    .detail-body {
      grid-template-columns: 1fr;
    }

    .tech-card {
      position: static;
    }
  }

  @media (max-width: 768px) {
    .detail-page {
      padding: 2rem 1.25rem 4rem;
    }

    .project-title {
      font-size: 2em;
    }

    .detail-header {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .project-title {
      font-size: 1.7em;
    }

    .btn-primary,
    .btn-secondary {
      width: 100%;
      text-align: center;
    }

    .action-row {
      flex-direction: column;
    }
  }
</style>
