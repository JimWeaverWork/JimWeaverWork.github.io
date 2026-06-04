<script lang="ts">
  import { socialLinks } from '../data.js';
  import { reveal } from '../actions.js';

  const RESUME_URL = '/JimWeaver_Resume.pdf';

  function openResume() {
    window.open(RESUME_URL, '_blank');
  }
</script>

<section class="section wrap" id="contact">
  <div class="section-head">
    <span class="section-idx">04</span>
    <h2 class="section-title">Contact</h2>
    <span class="section-meta">// open a channel</span>
  </div>

  <div class="reveal" use:reveal>
    <div class="contact-grid">
      <div class="contact-left">
        <div class="big">Let's build<br />something <span class="hl">that lasts.</span></div>
        <p>
          Open to backend, systems, and infrastructure roles. If you're working on something hard
          and reliable, I'd love to hear about it.
        </p>
        <button class="resume" onclick={openResume}><span>↓</span> DOWNLOAD RESUME</button>
      </div>
      <div class="contact-right">
        <div class="rh">ROUTING TABLE · 3 CHANNELS</div>
        {#each socialLinks as s (s.label)}
          <a
            class="clink"
            href={s.href}
            target={s.label === 'Email' ? undefined : '_blank'}
            rel="noreferrer"
          >
            <span class="lbl">{s.label}</span>
            <span class="hd">{s.handle}</span>
            <span class="ar">↗</span>
          </a>
        {/each}
      </div>
    </div>
  </div>

  <footer class="foot">
    <span>// built with svelte · typescript · vite</span>
    <span class="ops"><span class="led live"></span> ALL SYSTEMS OPERATIONAL · © MMXXVI JIM WEAVER</span>
  </footer>
</section>
