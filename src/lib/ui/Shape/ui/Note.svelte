<script lang="ts">
</script>

<div class="note">
  <span class="square" />
  <span class="text" contenteditable="true">Note</span>
</div>

<style>
  .note {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .square {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    background-color: rgb(251, 252, 134);
    box-shadow: 5px 5px 15px 0 rgb(0 0 0 / 12%);
  }

  .text {
    font-size: 1.63281em;
    color: rgb(0, 0, 0);
    outline: none;
    cursor: pointer;
  }
</style>
