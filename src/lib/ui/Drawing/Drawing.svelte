<script lang="ts">
  import { Figure, ConnectionNode } from '$lib/ui/Figure';
  import { drawingStore } from './store';

  const { figures, connections, mouse } = drawingStore;
  let svgRef: SVGSVGElement;

  const onMouseDown = (e: MouseEvent) => drawingStore.startPath(e, svgRef.getBoundingClientRect());
  const onMouseMove = (e: MouseEvent) => drawingStore.movePath(e, svgRef.getBoundingClientRect());
  const onMouseUp = () => drawingStore.endPath();
</script>

<svelte:document on:mousedown={onMouseDown} on:mousemove={onMouseMove} on:mouseup={onMouseUp} />

<div>
  {#each [...$connections] as node (node.uuid)}
    <ConnectionNode {node} />
  {/each}

  {#if $mouse && $mouse.connections}
    {#each [...$mouse.connections.values()] as node (node.uuid)}
      <ConnectionNode {node} />
    {/each}
  {/if}

  <svg class="drawing" bind:this={svgRef}>
    {#each [...$figures] as figure (figure.uuid)}
      <Figure type={figure.type} path={figure.path} />
    {/each}

    {#if $mouse}
      <Figure type={$mouse.type} path={$mouse.path} />
    {/if}
  </svg>
</div>

<style>
  .drawing {
    width: 800em;
    height: 600em;
    position: absolute;
    top: 0px;
    left: 0px;
    pointer-events: none;
    z-index: 200000000;
  }
</style>
