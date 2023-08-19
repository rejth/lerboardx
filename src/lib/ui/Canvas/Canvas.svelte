<script lang="ts">
  import { type ComponentType, onMount, getContext } from 'svelte';

  import { Tools, type Context, type ShapeType } from '$lib/types';
  import { CONTEXT_KEY } from '$lib/constants';
  import { dndWatcher } from '$lib/utils';

  import { Drawing } from '$lib/ui/Drawing';
  import { toolbarStore, isDrawingToolSelected } from '$lib/ui/Toolbar';
  import { Shape, Note, Text, Area, RectangularDragSelection } from '$lib/ui/Shape';

  const { canvasStore } = getContext<Context>(CONTEXT_KEY);
  const { shapes, mousePosition, selection } = canvasStore;
  const { tool } = toolbarStore;

  let canvasRef: HTMLDivElement;
  let multiselect = false;
  let clearSelected = false;

  const widgets: Record<ShapeType, ComponentType> = {
    [Tools.NOTE]: Note,
    [Tools.TEXT]: Text,
    [Tools.AREA]: Area,
  };

  $: styles = `
    transform: translate(${$mousePosition.x}px, ${$mousePosition.y}px);
    cursor: ${isDrawingToolSelected($tool) || $tool === Tools.SELECT ? 'default' : 'grab'};
  `;

  onMount(async () => {
    const dnd = dndWatcher(canvasRef);
    for await (const e of dnd) {
      canvasStore.dragCanvas(e as MouseEvent, canvasRef.getBoundingClientRect());
    }
  });

  onMount(async () => {
    const selection = dndWatcher(canvasRef);
    for await (const e of selection) {
      canvasStore.dragSelection(e as MouseEvent, canvasRef.getBoundingClientRect());
    }
  });

  const onClick = (e: MouseEvent) => {
    canvasStore.addShape(e, canvasRef.getBoundingClientRect());
    canvasStore.resetSelection();
  };

  const onKeydown = (e: KeyboardEvent) => {
    if (e.code === 'ShiftLeft') return (multiselect = true);
    if (e.code === 'Escape') return (clearSelected = true);
    if (e.code === 'Delete') canvasStore.deleteShape();
  };

  const onKeyup = () => {
    multiselect = false;
    clearSelected = false;
  };
</script>

<div class="canvas-wrapper">
  <div
    draggable
    tabindex="0"
    role="button"
    class="canvas"
    tabIndex={0}
    style={styles}
    bind:this={canvasRef}
    on:click={onClick}
    on:keydown={onKeydown}
    on:keyup={onKeyup}
  >
    {#if $tool === Tools.SELECT}
      <RectangularDragSelection path={$selection} />
    {/if}
    {#each [...$shapes.values()] as shape (shape.uuid)}
      <Shape settings={shape} {multiselect} {clearSelected}>
        <svelte:component this={widgets[shape.type]} />
      </Shape>
    {/each}
    <Drawing />
  </div>
</div>

<style>
  .canvas-wrapper {
    font-size: 1em;
    width: 800em;
    height: 600em;
    box-sizing: content-box;

    transform: translate(0%, 0%) scale(1);
    will-change: transform;
  }

  .canvas {
    position: relative;
    width: 100%;
    height: 100%;
    pointer-events: all;

    background-color: #f2f2f3;
    background-position: 0 0, 30em 30em;
    background-size: 60em 60em;
    background-image: linear-gradient(
        45deg,
        #f4f4f6 25%,
        transparent 25%,
        transparent 75%,
        #f4f4f6 75%
      ),
      linear-gradient(45deg, #f4f4f6 25%, transparent 25%, transparent 75%, #f4f4f6 75%);
  }
</style>
