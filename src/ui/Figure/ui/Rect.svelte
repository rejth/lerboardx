<script lang="ts">
  import { GeometryManager, type Point } from '$lib/services';

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
