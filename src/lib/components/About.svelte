<script lang="ts">
  import { observeOnce } from '../actions.js';
  import { aboutMe } from '../data.js';

  let visible = $state(false);
</script>

<section
  id="about"
  class="about-section"
  use:observeOnce={() => (visible = true)}
>
  <div class="about-inner" class:visible>
    <div class="about-text">
      <h2>About Me</h2>
      <p class="about-lead">{aboutMe.lead}</p>
      {#each aboutMe.paragraphs as para}
        <p>{para}</p>
      {/each}

      <div class="about-meta">
        {#each aboutMe.highlights as item}
          <div class="meta-item">
            <span class="meta-icon">{item.icon}</span>
            <span class="meta-label">{item.label}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="about-card">
      <div class="card-header">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="card-title">jim@portfolio ~ $</span>
      </div>
      <div class="card-body">
        {#each aboutMe.terminal as line}
          <div class="terminal-line">
            {#if line.prompt}
              <span class="prompt">❯</span>
            {/if}
            <span class="line-text" class:comment={line.comment} class:output={line.output}>
              {line.text}
            </span>
          </div>
        {/each}
        <div class="terminal-line">
          <span class="prompt">❯</span>
          <span class="cursor-blink">█</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-section {
    background: var(--background-color2);
    padding: 4rem 2rem 3rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .about-section::before {
    content: '';
    position: absolute;
    bottom: -80px;
    left: -80px;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    pointer-events: none;
  }

  .about-inner {
    max-width: 70vw;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .about-inner.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Text side */
  .about-text h2 {
    font-size: 2em;
    font-weight: 700;
    color: #c9d1d9;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
  }

  .about-text h2::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    width: 9.3rem;
    height: 3px;
    background: linear-gradient(90deg, #79c0ff, #a371f7);
    border-radius: 2px;
  }

  .about-lead {
    font-size: 1.15em;
    color: #c9d1d9 !important;
    margin-top: 1.2rem;
    margin-bottom: 1rem;
    line-height: 1.7;
  }

  .about-text p {
    color: #8b949e;
    line-height: 1.75;
    margin-bottom: 1em;
  }

  .about-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 8px;
    padding: 0.45em 0.9em;
    font-size: 0.9em;
    color: #8b949e;
    transition: border-color 0.2s ease;
  }

  .meta-item:hover {
    border-color: #79c0ff;
  }

  .meta-icon {
    font-size: 1em;
  }

  /* Terminal card */
  .about-card {
    background: #010409;
    border: 1px solid #30363d;
    border-radius: 12px;
    overflow: hidden;
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
    font-size: 0.9em;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
    transition: box-shadow 0.4s ease, border-color 0.4s ease;
  }

  .about-card:hover {
    border-color: #a371f7;
    box-shadow: 0 12px 50px rgba(163, 113, 247, 0.15);
  }

  .card-header {
    background: #161b22;
    border-bottom: 1px solid #30363d;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .dot.red    { background: #ff5f57; }
  .dot.yellow { background: #ffbd2e; }
  .dot.green  { background: #28c840; }

  .card-title {
    margin-left: 0.75rem;
    color: #484f58;
    font-size: 0.85em;
    letter-spacing: 0.03em;
  }

  .card-body {
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-height: 220px;
  }

  .terminal-line {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    line-height: 1.6;
  }

  .prompt {
    color: #a371f7;
    flex-shrink: 0;
    font-size: 0.9em;
  }

  .line-text {
    color: #c9d1d9;
  }

  .line-text.comment {
    color: #484f58;
  }

  .line-text.output {
    color: #79c0ff;
  }

  .cursor-blink {
    color: #a371f7;
    animation: blink 1s step-end infinite;
    font-size: 0.85em;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  /* Responsive */
  @media (max-width: 900px) {
    .about-inner {
      grid-template-columns: 1fr;
      max-width: 100%;
      gap: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    .about-section {
      padding: 3rem 1.25rem;
      border-radius: 0px;
    }

    .about-card {
      font-size: 0.8em;
    }

    .card-body {
      min-height: 160px;
      padding: 1rem 1.1rem;
    }
  }

  @media (max-width: 480px) {
    .about-meta {
      gap: 0.5rem;
    }

    .meta-item {
      font-size: 0.82em;
      padding: 0.4em 0.7em;
    }
  }
</style>