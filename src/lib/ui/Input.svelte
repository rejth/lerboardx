<script lang="ts">
  export let label: string;
  export let placeholder: string;
</script>

<div class="input-wrapper">
  <label for={label}>{label}</label>
  <input class="input" id={label} {placeholder} value="" />
</div>

<style>
  label {
    font-weight: 700;
    line-height: 1.25;
  }

  input {
    font-family: inherit;
    font-size: 100%;
    line-height: inherit;
    color: inherit;
    outline: none;
    margin: 0;
  }

  .input-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 2.5rem;
    gap: 0.5rem;
  }

  .input {
    padding: 0.25rem 1.25rem;
    border: 1px solid #e5e7eb;
  }

  .input:hover {
    border: 1px solid var(--color-grey-black);
  }

  .input:focus {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
  }
</style>
