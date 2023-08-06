<script lang="ts">
  import { v4 as uuid } from 'uuid';
  import { Button, Label, Input, Tooltip } from 'flowbite-svelte';

  import { goto } from '$app/navigation';
  import Divider from '$lib/ui/Divider.svelte';

  let username = '';
  let roomId = '';
  let roomName = '';

  const openNewBoard = () => {
    goto(uuid());
  };

  const joinRoom = () => {
    goto(roomId);
  };
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Home" />
</svelte:head>

<section class="home">
  <h1 class="title">Lerboardx</h1>
  <h3 class="subtitle">Collaborative whiteboard</h3>

  <div class="user-name">
    <div class="mt-10 mb-2">
      <Label for="user-name" class="block mb-2">
        <strong>Enter your name</strong>
      </Label>
      <Input id="user-name" placeholder="user name" bind:value={username} />
    </div>
  </div>

  <Divider text="" />

  <div class="join-room">
    <div class="mb-2">
      <Label for="room-id" class="block mb-2">
        <strong>Enter room id</strong>
      </Label>
      <Input id="room-id" placeholder="room id" bind:value={roomId} />
    </div>
    <Button size="sm" disabled={!roomId} on:click={joinRoom}>Join</Button>
    {#if !roomId}
      <Tooltip>Fill the room id</Tooltip>
    {/if}
  </div>

  <Divider text="or" />

  <div class="create-room">
    <div class="mb-2">
      <Label for="room-name" class="block mb-2">
        <strong>Enter room name</strong>
      </Label>
      <Input id="room-name" placeholder="room name" bind:value={roomName} />
    </div>
    <Button size="sm" disabled={!roomName} on:click={openNewBoard}>Create</Button>
    {#if !roomName}
      <Tooltip>Fill the room name</Tooltip>
    {/if}
  </div>
</section>

<style>
  .home {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-main-white);
  }

  .join-room {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .create-room {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .title {
    font-weight: 800;
    font-size: 6rem;
    line-height: 1.25;
  }

  .subtitle {
    font-weight: 500;
    font-size: 1.5rem;
  }
</style>
