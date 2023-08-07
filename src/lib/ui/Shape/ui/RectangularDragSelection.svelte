<script lang="ts">
  import type { Point } from '$lib/types';
  import { GeometryManager } from '$lib/services';

  export let path: Point[];
  const geometryManager = new GeometryManager();

  $: pointer = geometryManager.getRectDimension(path);

  $: style = `
    left: ${pointer.x}px;
    top: ${pointer.y}px;
    width: ${pointer.width}px;
    height: ${pointer.height}px;
  `;
</script>

<span class="rectangular-selection" {style} />

<style>
  .rectangular-selection {
    position: absolute;
    border: 2px solid #35b2dc;
    background-color: #35b2dc33;
    pointer-events: none;
  }
</style>
