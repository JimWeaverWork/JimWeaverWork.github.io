<script lang="ts">
  import { socialLinks } from '../data.js';
  import { observeOnce } from '../actions.js';

  let visible = $state(false);
</script>

<section
  id="contact"
  class="contact-section"
  use:observeOnce={() => visible = true}
>
  <div class="contact-content" class:visible>
    <h2>Let's Connect</h2>
    <div class="contact-links">
      {#each socialLinks as link}
        <a
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noreferrer' : undefined}
          class="social-link"
          title={link.label}
        >
          {#if typeof link.icon === 'string'}
            <div class="icon-wrapper">
              {@html link.icon}
            </div>
          {:else}
            <svg
              role="img"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="24"
              height="24"
            >
              <path d={link.icon.path} />
            </svg>
          {/if}

          <span class="sr-only">{link.label}</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  .contact-section {
    background: var(--background-color);
    text-align: center;
  }

  .contact-content {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .contact-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .contact-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    border-radius: 8px;
    border: 2px solid #30363d;
    color: #79c0ff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 1.5em;
    line-height: 1;
  }

  .social-link :global(svg) {
    width: 28px;
    height: 28px;
    display: block;
    object-fit: contain;
    fill: currentColor;
  }

  .social-link :global(svg *) {
    fill: currentColor;
  }

  .social-link:hover {
    border-color: #a371f7;
    color: #a371f7;
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(163, 113, 247, 0.3);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  @media (max-width: 480px) {
    .contact-links {
      gap: 1.25rem;
    }

    .social-link {
      width: 48px;
      height: 48px;
    }
  }
</style>