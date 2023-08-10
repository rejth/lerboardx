<script lang="ts">
  import { getContext } from 'svelte';

  import type { Context } from '$lib/types';
  import { CONTEXT_KEY } from '$lib/constants';

  import UndoIcon from '$lib/ui/Icons/UndoIcon.svelte';
  import RedoIcon from '$lib/ui/Icons/RedoIcon.svelte';

  const { socket, undoRedoStore } = getContext<Context>(CONTEXT_KEY);
  const { history, undone } = undoRedoStore;

  $: undoDisabled = !$history.length;
  $: redoDisabled = !$undone.length;
  $: undoColor = undoDisabled ? '#d3d3d3' : '#00263A';
  $: redoColor = redoDisabled ? '#d3d3d3' : '#00263A';

  const undo = () => {
    const lastCanvasState = undoRedoStore.undo();
    socket.emit('order:undo', Array.from(lastCanvasState));
  };

  const redo = () => {
    const lastCanvasState = undoRedoStore.redo();
    socket.emit('order:redo', Array.from(lastCanvasState));
  };
</script>

<div class="undo-redo-toolbar">
  <div class="undo-redo">
    <span
      tabindex="0"
      role="button"
      class="icon"
      class:disabled={undoDisabled}
      on:click={undo}
      on:keydown={undo}
    >
      <UndoIcon color={undoColor} />
    </span>
    <span
      tabindex="0"
      role="button"
      class="icon"
      class:disabled={redoDisabled}
      on:click={redo}
      on:keydown={redo}
    >
      <RedoIcon color={redoColor} />
    </span>
  </div>
</div>

<style>
  .undo-redo-toolbar {
    position: absolute;
    font-size: 1.2em;
    left: 1em;
    bottom: 1.5em;

    border: 2px solid #f4f4f6;
    box-shadow: 0px 2px 6px 0px #00263a0f;
    background: white;
    border-radius: 6px;
    pointer-events: all;
  }

  .undo-redo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    width: 3em;
    min-width: 2em;
    padding: 0.5em 0.5rem;
    margin: 0;
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .disabled {
    pointer-events: none;
  }
</style>
