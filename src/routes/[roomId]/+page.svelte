<script lang="ts">
  import { onMount, setContext, onDestroy } from 'svelte';
  import { io } from 'socket.io-client';

  import type { Context, RoomLoadData, ShapeConfig } from '$lib/types';
  import { CONTEXT_KEY } from '$lib/constants';

  import { Toolbar } from '$lib/ui/Toolbar';
  import { Canvas, CanvasStore } from '$lib/ui/Canvas';
  import { UndoRedo, UndoRedoStore } from '$lib/ui/UndoRedo';

  export let data: RoomLoadData;

  const socket = io();
  const undoRedoStore = new UndoRedoStore();
  const canvasStore = new CanvasStore(socket, undoRedoStore);

  setContext<Context>(CONTEXT_KEY, {
    socket,
    canvasStore,
    undoRedoStore,
  });

  onDestroy(() => {
    canvasStore.setCanvas(new Map());
  });

  onMount(() => {
    socket.emit('order:join-room', data.roomId);
    socket.on('board', (board: Array<[string, ShapeConfig]>) => {
      canvasStore.setCanvas(new Map(board));
    });
  });
</script>

<svelte:head>
  <title>Board</title>
  <meta name="description" content="Board" />
</svelte:head>

<div class="board" role="button" tabindex="0">
  <div class="content-wrapper">
    <div class="scroll-wrapper">
      <Canvas />
    </div>
    <div class="tools-wrapper">
      <Toolbar />
      <UndoRedo />
    </div>
  </div>
</div>

<style>
  .board {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 2em);
    box-sizing: border-box;
  }

  .content-wrapper {
    position: relative;
    flex-grow: 1;
    height: 80%;
  }

  .scroll-wrapper {
    height: 100%;
    overflow: auto;
    background-color: #f4f4f6;
  }

  .tools-wrapper {
    position: absolute;
    top: 0;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    z-index: 400000010;
    pointer-events: none;
  }
</style>
