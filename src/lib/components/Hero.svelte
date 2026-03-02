<script lang="ts">
  import { onMount } from 'svelte';
  import { portfolioState } from '../stores.svelte.js';
  import { heroTitles } from '../data.js';

  let visible = $state(false);
  let typewriterText = $state('');
  let titleIndex = $state(0);

  async function typewriter(text: string) {
    typewriterText = '';
    for (let i = 0; i <= text.length; i++) {
      typewriterText = text.slice(0, i);
      await new Promise(r => setTimeout(r, 80));
    }
    await new Promise(r => setTimeout(r, 1800));
    for (let i = text.length; i >= 0; i--) {
      typewriterText = text.slice(0, i);
      await new Promise(r => setTimeout(r, 40));
    }
  }

  async function runTypewriterLoop() {
    while (true) {
      await typewriter(heroTitles[titleIndex % heroTitles.length]);
      titleIndex++;
    }
  }

  function downloadResume() {
    const resumeUrl = '/JimWeaver_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'JimWeaver_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onMount(() => {
    visible = true;
    runTypewriterLoop();
  });
</script>

<section class="hero">
  <div class="hero-content" class:visible>
    <p class="hero-eyebrow">Welcome to my portfolio</p>
    <h1>Hello, I'm<br /><span class="typewriter-text">{typewriterText}<span class="cursor">|</span></span></h1>
    <p>I design performant backends with scalability, saftey, and security in mind.</p>
    <div class="hero-buttons">
      <button onclick={() => portfolioState.scrollToSection('projects')} class="btn-primary">
        View My Work
      </button>
      <button onclick={downloadResume} class="btn-secondary">
        Download Resume
      </button>
    </div>
  </div>
</section>

<style>
  .hero {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(13, 17, 23, 1) 0%, rgba(13, 17, 23, 0.8) 100%);
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(163, 113, 247, 0.1) 0%, transparent 70%);
    border-radius: 50%;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-eyebrow {
    font-size: 0.95em;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #a371f7;
    margin-bottom: 0.5em;
  }

  /* Override global h1 for hero */
  .hero :global(h1),
  .hero-content h1 {
    background: linear-gradient(135deg, #79c0ff 0%, #a371f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 4em;
    margin-bottom: 0.5em;
  }

  .hero-content p {
    font-size: 1.3em;
    color: #8b949e;
    margin-bottom: 2em;
  }

  .typewriter-text {
    background: linear-gradient(135deg, #79c0ff 0%, #a371f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .cursor {
    -webkit-text-fill-color: #a371f7;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    padding: 0.8em 2em;
    font-size: 1.1em;
    background: linear-gradient(135deg, #79c0ff 0%, #a371f7 100%);
    border: none;
    color: #0d1117;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, #a371f7 0%, #79c0ff 100%);
    box-shadow: 0 0 30px rgba(163, 113, 247, 0.5);
    transform: translateY(-2px);
  }

  .btn-secondary {
    padding: 0.8em 2em;
    font-size: 1.1em;
    background: transparent;
    border: 2px solid #30363d;
    border-radius: 8px;
    color: #c9d1d9;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    border-color: #a371f7;
    color: #a371f7;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .hero {
      min-height: 70vh;
      padding: 2rem 1.25rem;
    }

    .hero-content h1 {
      font-size: 2.5em;
    }

    .hero-content p {
      font-size: 1.1em;
    }

    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }

    .hero-buttons button {
      width: 100%;
      max-width: 260px;
    }
  }

  @media (max-width: 480px) {
    .hero-content h1 {
      font-size: 2em;
    }

    .hero-eyebrow {
      font-size: 0.8em;
    }
  }
</style>