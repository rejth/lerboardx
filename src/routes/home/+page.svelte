<script>
  import welcome from '$lib/images/svelte-welcome.webp';
  import welcome_fallback from '$lib/images/svelte-welcome.png';

  import Header from '~/ui/Header.svelte';
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Home" />
</svelte:head>

<div class="home">
  <Header />
  <main>
    <section>
      <h1>
        <span class="welcome">
          <picture>
            <source srcset={welcome} type="image/webp" />
            <img src={welcome_fallback} alt="Welcome" />
          </picture>
        </span>
      </h1>
    </section>
  </main>
  <footer>
    <p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
  </footer>
</div>

<style>
  .home {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    background-attachment: fixed;
    background-color: var(--color-bg-1);
    background-size: 100vw 100vh;
    background-image: radial-gradient(
        50% 50% at 50% 50%,
        rgba(255, 255, 255, 0.75) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      linear-gradient(180deg, var(--color-bg-0) 0%, var(--color-bg-1) 15%, var(--color-bg-2) 50%);
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }

  h1 {
    width: 100%;
  }

  .welcome {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    padding: 0 0 calc(100% * 495 / 2048) 0;
  }

  .welcome img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: block;
  }
</style>
