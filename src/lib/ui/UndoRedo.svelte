<script lang="ts">
  import { getContext } from 'svelte';

  import type { Context } from '$lib/types';
  import { CONTEXT_KEY } from '$lib/constants';

  import undoIcon from '$lib/images/undo.svg';
  import redoIcon from '$lib/images/redo.svg';
  import Icon from '$lib/ui/Icon.svelte';

  const { socket, undoRedoStore } = getContext<Context>(CONTEXT_KEY);

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
    <span class="icon" class:active={true} class:disabled={false} title={'Undo'}>
      <Icon src={undoIcon} alt={'Undo'} on:click={undo} />
    </span>
    <span class="icon" class:active={true} class:disabled={false} title={'Redo'}>
      <Icon src={redoIcon} alt={'Redo'} on:click={redo} />
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
    color: #d3d3d3;
    pointer-events: none;
  }
</style>
