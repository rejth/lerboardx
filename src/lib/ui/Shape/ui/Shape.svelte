<script lang="ts">
  import { getContext, onMount } from 'svelte';

  import type { Context, ShapeConfig } from '$lib/types';
  import { clickOutside, dndWatcher, mouseWatcherOnTarget, throttle } from '$lib/utils';
  import { CONTEXT_KEY } from '$lib/constants';

  import { Selection } from './';
  import { ShapeModel } from '../model';

  export let settings: ShapeConfig;
  export let multiselect: boolean;
  export let clearSelected: boolean;

  const { socket, canvasStore, undoRedoStore } = getContext<Context>(CONTEXT_KEY);
  const shapeModel = new ShapeModel(settings, socket, canvasStore, undoRedoStore);

  const { shapes, selection } = canvasStore;
  const { shape } = shapeModel;

  const deleteIcon = document.getElementById('toolbar');
  let shapeRef: HTMLDivElement;

  $: styles = `
    width: ${$shape?.width}px;
    height: ${$shape?.height}px;
    transform: translate(${$shape?.x}px, ${$shape?.y}px);
  `;

  $: shapeModel.overlap($selection);
  $: clearSelected ? onClickOutside() : null;

  onMount(async () => {
    const emitMoving = (shape: ShapeConfig) => socket.emit('order:change', shape);

    const dnd = dndWatcher(shapeRef);
    const tracker = mouseWatcherOnTarget(shapeRef, 'mouseup');
    const throttleMoving = throttle(emitMoving, 20);

    const watchDnd = async () => {
      for await (const e of dnd) {
        const newPosition = shapeModel.move(e as MouseEvent, shapeRef.getBoundingClientRect());
        throttleMoving(newPosition);
      }
    };
    const watchMouseUp = async () => {
      for await (const _e of tracker) {
        const state = structuredClone($shapes).set($shape.uuid, $shape);
        canvasStore.setCanvas(state);
        undoRedoStore.pushToHistory(state);
      }
    };

    await Promise.all([watchDnd(), watchMouseUp()]);
  });

  const onClickOutside = () => {
    if (multiselect) return;
    shapeModel.select(false);
    canvasStore.clearAllSelected();
  };

  const onSelect = () => {
    shapeModel.select(true);
    canvasStore.selectShape(settings);
  };
</script>

<div
  tabindex="0"
  role="button"
  class="shape-wrapper"
  use:clickOutside={{ exclude: [deleteIcon] }}
  on:mousedown={onSelect}
  on:outclick={onClickOutside}
>
  <div class="shape" style={styles} bind:this={shapeRef}>
    <slot />
  </div>
  {#if $shape?.selected}
    <Selection {styles} model={shapeModel} />
  {/if}
</div>

<style>
  .shape {
    position: absolute;
    top: 0;
    left: 0;
    width: 9rem;
    height: 9rem;
    padding: 0.5rem;

    text-align: center;
    user-select: none;
    touch-action: none;
    cursor: move;

    font-size: 0.9em;
    color: rgb(0, 0, 0);
    border-radius: 0.2rem;
  }
</style>
