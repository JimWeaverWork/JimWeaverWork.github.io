<script lang="ts">
  import { skills } from '../data.js';
  import { observeOnce } from '../actions.js';

  let visible = $state(false);
</script>

<section
  id="skills"
  class="skills-section"
  use:observeOnce={() => visible = true}
>
  <h2>Skills & Technologies</h2>
  <div class="skills-grid">
    {#each skills as skillGroup (skillGroup.name)}
      <div class="skill-item">
        <h3>{skillGroup.name}</h3>
        <p class="skill-items-list">{skillGroup.items.join(', ')}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  .skills-section {
    background-color: var(--background-color2);
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
    margin-top: 2em;
  }

  .skill-item {
    background-color: #161b22;
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .skill-item:hover {
    border-color: #a371f7;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(163, 113, 247, 0.2);
  }

  .skill-item h3 {
    color: #79c0ff;
    font-size: 1.1em;
    margin-bottom: 0.5rem;
  }

  .skill-item p {
    color: #8b949e;
    font-size: 0.9em;
    margin: 0;
  }

  .skill-items-list {
    font-size: 0.9em;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    .skills-grid {
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1rem;
    }

    .skill-item {
      padding: 1.1rem;
    }
  }

  @media (max-width: 480px) {
    .skills-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>