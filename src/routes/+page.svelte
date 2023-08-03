<script lang="ts">
  import { v4 as uuid } from 'uuid';

  import { goto } from '$app/navigation';

  import Button from '$lib/ui/Button.svelte';
  import Input from '$lib/ui/Input.svelte';
  import Divider from '$lib/ui/Divider.svelte';

  const onCreateRoom = () => {
    goto(uuid());
  };

  const onJoinRoom = () => {};
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Home" />
</svelte:head>

<section class="home">
  <h1 class="title">Lerboardx</h1>
  <h3 class="subtitle">Collaborative whiteboard</h3>

  <form class="form">
    <Input label="Enter your name" placeholder="username" />
    <Input label="Enter room id" placeholder="room id" />
    <Button name="Join" onClick={onJoinRoom} />
  </form>

  <Divider />

  <div class="create-room">
    <strong>Create new room</strong>
    <Button name="Create" onClick={onCreateRoom} />
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

  .form {
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
    font-size: 1.5rem;
    font-weight: 500;
  }
</style>
