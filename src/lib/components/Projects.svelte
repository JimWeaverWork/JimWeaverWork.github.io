<script lang="ts">
  import { portfolioState } from '../stores.svelte.js';
  import { projects } from '../data.js';
  import { observeProject } from '../actions.js';

  let visibleProjects = $state<Set<string>>(new Set());

  const allTags = $derived([...new Set(projects.flatMap(p => p.tags))]);
  const filteredProjects = $derived(
    portfolioState.filterTag
      ? projects.filter(p => p.tags.includes(portfolioState.filterTag!))
      : projects
  );

  function onProjectVisible(title: string) {
    visibleProjects = new Set([...visibleProjects, title]);
  }
</script>

<section id="projects" class="projects-section">
  <h2>Featured Projects</h2>

  <div class="tag-filter">
    <button
      class="filter-btn"
      class:active-filter={portfolioState.filterTag === null}
      onclick={() => portfolioState.clearFilterTag()}
    >All</button>
    {#each allTags as tag}
      <button
        class="filter-btn"
        class:active-filter={portfolioState.filterTag === tag}
        onclick={() => portfolioState.toggleFilterTag(tag)}
      >{tag}</button>
    {/each}
  </div>

  <div class="projects-grid">
    {#each filteredProjects as project (project.title)}
      <div
        class="project-card"
        class:revealed={visibleProjects.has(project.title)}
        use:observeProject={{ title: project.title, onVisible: onProjectVisible }}
      >
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div class="project-tags">
          {#each project.tags as tag}
            <button
              class="tag"
              class:tag-active={portfolioState.filterTag === tag}
              onclick={() => portfolioState.toggleFilterTag(tag)}
            >{tag}</button>
          {/each}
        </div>
        <button onclick={() => window.open(project.link, '_blank')} class="view-btn">
          View Project →
        </button>
      </div>
    {/each}
  </div>

  {#if filteredProjects.length === 0}
    <p class="no-results">
      No projects match that filter.
      <button onclick={() => portfolioState.clearFilterTag()} class="clear-btn">
        Clear filter
      </button>
    </p>
  {/if}
</section>

<style>
  .projects-section {
    background-color: var(--background-color2);
  }

  /* Tag filter bar */
  .tag-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1.5em 0;
  }

  .filter-btn {
    padding: 0.35em 1em;
    border-radius: 20px;
    border: 1px solid #30363d;
    background: #0d1117;
    color: #8b949e;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.2s ease;
  }

  .filter-btn:hover {
    border-color: #79c0ff;
    color: #79c0ff;
  }

  .filter-btn.active-filter {
    background: linear-gradient(135deg, #79c0ff20, #a371f720);
    border-color: #a371f7;
    color: #a371f7;
  }

  /* Grid */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2em;
  }

  /* Cards */
  .project-card {
    background-color: #0d1117;
    border: 1px solid #30363d;
    border-radius: 12px;
    padding: 1.5rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease,
      border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .project-card:nth-child(1) { transition-delay: 0s; }
  .project-card:nth-child(2) { transition-delay: 0.1s; }
  .project-card:nth-child(3) { transition-delay: 0.2s; }
  .project-card:nth-child(4) { transition-delay: 0.3s; }

  .project-card.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  .project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #79c0ff, #a371f7);
    transform: translateX(-100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .project-card:hover::before {
    transform: translateX(0);
  }

  .project-card:hover {
    border-color: #a371f7;
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(163, 113, 247, 0.2);
  }

  .project-card h3 {
    margin-bottom: 0.5rem;
    color: #79c0ff;
    transition: color 0.3s ease;
  }

  .project-card:hover h3 {
    color: #a371f7;
  }

  .project-card p {
    color: #8b949e;
    margin-bottom: 1rem;
  }

  /* Tags */
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .tag {
    display: inline-block;
    background-color: #161b22;
    color: #79c0ff;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85em;
    border: 1px solid #30363d;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .tag:hover {
    background-color: #30363d;
    border-color: #79c0ff;
  }

  .tag.tag-active {
    background: #79c0ff20;
    border-color: #a371f7;
    color: #a371f7;
  }

  .view-btn {
    margin-top: 1rem;
    padding: 0.5em 1em;
    font-size: 0.95em;
  }

  /* Empty state */
  .no-results {
    text-align: center;
    color: #8b949e;
    margin-top: 2rem;
  }

  .clear-btn {
    background: none;
    border: none;
    color: #79c0ff;
    cursor: pointer;
    padding: 0;
    font-size: inherit;
  }

  @media (max-width: 768px) {
    .projects-section {
      border-radius: 0px;
    }

    .projects-grid {
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }

    .tag-filter {
      gap: 0.4rem;
    }

    .filter-btn {
      font-size: 0.82em;
      padding: 0.3em 0.8em;
    }
  }

  @media (max-width: 480px) {
    .project-card {
      padding: 1.25rem;
    }

    .view-btn {
      width: 100%;
      text-align: center;
    }
  }
</style>