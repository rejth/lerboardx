<script>
  import '../app.postcss';

  import '$lib/styles/_index.scss';
  import Header from '$lib/ui/Header.svelte';
</script>

<div class="app">
  <Header />
  <main>
    <slot />
  </main>
</div>

<style>
</style>
