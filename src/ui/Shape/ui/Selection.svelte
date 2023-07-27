<script lang="ts">
  import { onMount } from 'svelte';

  import { resizeWatcher } from '$lib/helpers';
  import type { ShapeModel } from '../model';

  export let model: ShapeModel;
  export let styles: string;

  let selectionRef: HTMLSpanElement;
  let cornerRef: HTMLSpanElement;
  const cornerStyles = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

  onMount(async () => {
    const resize = resizeWatcher(cornerRef);
    for await (const e of resize) {
      model.resize(e as MouseEvent, selectionRef.getBoundingClientRect());
    }
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
