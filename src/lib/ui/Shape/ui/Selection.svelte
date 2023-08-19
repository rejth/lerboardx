<script lang="ts">
  import { onMount, getContext } from 'svelte';

  import type { Context, ShapeConfig } from '$lib/types';
  import { mouseWatcherOnTarget, resizeWatcher, throttle } from '$lib/utils';
  import { CONTEXT_KEY } from '$lib/constants';

  import type { ShapeModel } from '../model';

  export let model: ShapeModel;
  export let styles: string;

  const { socket, canvasStore, undoRedoStore } = getContext<Context>(CONTEXT_KEY);
  const { shapes } = canvasStore;
  const { shape } = model;

  let selectionRef: HTMLSpanElement;
  let cornerRef: HTMLSpanElement;
  const cornerStyles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

  onMount(async () => {
    const emitResizing = (shape: ShapeConfig) => socket.emit('order:change', shape);

    const resize = resizeWatcher(cornerRef);
    const tracker = mouseWatcherOnTarget(cornerRef, 'mouseup');
    const throttleResizing = throttle(emitResizing, 20);

    const watchResizing = async () => {
      for await (const e of resize) {
        const newSize = model.resize(e as MouseEvent, selectionRef.getBoundingClientRect());
        throttleResizing(newSize);
      }
    };
    const watchMouseUp = async () => {
      for await (const _e of tracker) {
        const state = structuredClone($shapes).set($shape.uuid, $shape);
        canvasStore.setCanvas(state);
        undoRedoStore.pushToHistory(state);
      }
    };

    await Promise.all([watchResizing(), watchMouseUp()]);
  });
</script>

<span class="selection" id="selection" style={styles} bind:this={selectionRef}>
  {#each cornerStyles as corner}
    <span class={`corner-resize-drag ${corner}`} bind:this={cornerRef} />
  {/each}
</span>

<style>
  .selection {
    position: absolute;
    top: 0;
    left: 0;
    width: 9rem;
    height: 9rem;

    border: 2px solid #35b2dc;
    pointer-events: none;
  }

  .corner-resize-drag {
    position: absolute;
    display: block;
    width: 10px;
    height: 10px;

    border: 1px solid #cccccc;
    border-radius: 20%;
    pointer-events: all;
    cursor: nwse-resize;

    box-shadow: 2px 2px 5px 0 rgb(0 0 0 / 16%);
    background-color: #ffff;
  }

  .corner-resize-drag.top-left {
    top: -7px;
    left: -7px;
  }

  .corner-resize-drag.top-right {
    top: -7px;
    right: -7px;
  }

  .corner-resize-drag.bottom-left {
    bottom: -7px;
    left: -7px;
  }

  .corner-resize-drag.bottom-right {
    right: -7px;
    bottom: -7px;
  }
</style>
