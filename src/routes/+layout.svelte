<script>
  import { setContext } from 'svelte';
  import { io } from 'socket.io-client';

  import { CONTEXT_KEY } from '$lib/constants';
  import { CanvasModel } from '$lib/ui/Canvas';
  import Header from '$lib/ui/Header.svelte';

  import '$lib/styles/_index.scss';

  const socket = io();

  setContext(CONTEXT_KEY, { socket, canvasStore: new CanvasModel(socket) });
</script>

<div class="app">
  <Header />
  <main>
    <slot />
  </main>
</div>

<style>
</style>
