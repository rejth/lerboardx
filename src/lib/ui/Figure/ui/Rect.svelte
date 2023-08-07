<script lang="ts">
  import type { Point } from '$lib/types';
  import { GeometryManager } from '$lib/services';

  export let path: Point[];
  const geometryManager = new GeometryManager();

  $: rect = geometryManager.getRectDimension(path);
</script>

<rect class="figure-rect" {...rect} />

<style>
  .figure-rect {
    stroke: #444444;
    stroke-width: max(0.1em, 1.5px);
    stroke-linecap: round;
    fill: transparent;
  }
</style>
