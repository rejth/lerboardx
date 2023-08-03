<script lang="ts">
  export let name: string;
  export let onClick: () => void;
</script>

<button class="button" type="submit" on:click={onClick}>{name}</button>

<style>
  button {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    margin: 0;
  }

  .button {
    border: none;
    border-radius: 0.75rem;
    padding: 0.25rem 1.25rem;

    background-color: #000000;
    color: #ffffff;

    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;

    cursor: pointer;
  }
</style>
