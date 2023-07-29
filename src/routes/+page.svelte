<script lang="ts">
  import { setContext } from 'svelte';
  import { io } from 'socket.io-client';

  import { CONTEXT_KEY } from '$lib/constants';

  import { Canvas, CanvasModel } from '~/ui/Canvas';
  import { Toolbar } from '~/ui/Toolbar';
  import Header from '~/ui/Header.svelte';

  const socket = io();

  setContext(CONTEXT_KEY, {
    socket,
    canvasStore: new CanvasModel(socket),
  });
</script>

<svelte:head>
  <title>Board</title>
  <meta name="description" content="Board" />
</svelte:head>

<div class="board" role="button" tabindex="0">
  <Header />
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
