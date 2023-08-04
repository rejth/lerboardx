<script lang="ts">
  import { onMount, getContext } from 'svelte';

  import type { Context } from '$lib/types';
  import { CONTEXT_KEY } from '$lib/constants';

  import { Canvas, type ShapeConfig } from '$lib/ui/Canvas';
  import { Toolbar } from '$lib/ui/Toolbar';

  type PageLoadData = { roomId: string };
  export let data: PageLoadData;

  const { socket, canvasStore } = getContext<Context>(CONTEXT_KEY);

  onMount(() => {
    socket.emit('order:join-room', data.roomId);
  });

  socket.on('board', (board: Array<[string, ShapeConfig]>) => {
    canvasStore.setCanvas(new Map(board));
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
