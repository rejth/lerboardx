<script lang="ts">
  export let text: string;
</script>

<div class="divider-wrapper">
  <div class="line" />
  {#if text}
    <p class="text">{text}</p>
  {/if}
  <div class="line" />
</div>

<style>
  .divider-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 24rem;

    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .line {
    height: 1px;
    width: 100%;
    background-color: #e4e4e7;
  }

  .text {
    color: #a1a1aa;
  }
</style>
