<script lang="ts">
  import { skills } from '../data.js';
  import { reveal } from '../actions.js';
  import CountUp from './CountUp.svelte';
</script>

<section class="section wrap" id="skills">
  <div class="section-head">
    <span class="section-idx">03</span>
    <h2 class="section-title">Stack</h2>
    <span class="section-meta">// capabilities matrix</span>
  </div>

  <div class="reveal" use:reveal>
    <div class="smatrix">
      {#each skills as g, gi (g.name)}
        <div class="smod">
          <div class="smod-head">
            <span class="ix">{String(gi).padStart(2, '0')}</span>
            <span class="nm">{g.name}</span>
            <span class="ct"><CountUp to={g.items.length} pad={2} /> MODULES</span>
          </div>
          <div class="smod-body">
            {#each g.items as it (it)}
              <span class="skill">{it}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
