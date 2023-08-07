<script lang="ts">
  import type { Point } from '$lib/types';

  export let path: Point[];

  $: curve = [`M ${path[0].x} ${path[0].y}`];
  $: collector = path.map((point) => `L ${point.x} ${point.y}`);
</script>

<g>
  <path class="figure-pen" d={curve.concat(collector).join(' ')} />
</g>

<style>
  .figure-pen {
    stroke: #444444;
    stroke-width: max(0.1em, 1.5px);
    stroke-linecap: round;
    fill: transparent;
  }
</style>
