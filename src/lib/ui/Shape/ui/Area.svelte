<script lang="ts">
</script>

<div class="area">
  <span class="rect" />
  <span class="text" contenteditable="true">Text Area</span>
</div>

<style>
  .area {
    display: inline-flex;
    align-items: flex-start;
    justify-content: flex-start;
    box-shadow: none;
  }

  .rect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    box-shadow: 5px 5px 15px 0 rgb(0 0 0 / 12%);
    background-color: #ffffff;
  }

  .text {
    font-size: 1.63281em;
    color: rgb(0, 0, 0);
    outline: none;
    cursor: pointer;
  }
</style>
