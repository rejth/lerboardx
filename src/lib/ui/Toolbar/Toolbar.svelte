<script lang="ts">
  import { getContext } from 'svelte';

  import { Tools, type Context, type Tool } from '$lib/types';
  import { CONTEXT_KEY } from '$lib/constants';

  import NoteIcon from '$lib/ui/Icons/NoteIcon.svelte';
  import TextIcon from '$lib/ui/Icons/TextIcon.svelte';
  import AreaIcon from '$lib/ui/Icons/AreaIcon.svelte';
  import PanIcon from '$lib/ui/Icons/PanIcon.svelte';
  import SelectIcon from '$lib/ui/Icons/SelectIcon.svelte';
  import ConnectIcon from '$lib/ui/Icons/ConnectIcon.svelte';
  import PenIcon from '$lib/ui/Icons/PenIcon.svelte';
  import TrashIcon from '$lib/ui/Icons/TrashIcon.svelte';

  import { toolbarModel } from '.';

  const { canvasStore } = getContext<Context>(CONTEXT_KEY);
  const { selectedShapes } = canvasStore;
  const { tool } = toolbarModel;

  $: tools = [
    {
      label: 'Note',
      type: Tools.NOTE,
      icon: NoteIcon,
      hoverText: 'Drag to add new text note',
    },
    {
      label: 'Area',
      type: Tools.AREA,
      icon: AreaIcon,
      hoverText: 'Drag to add new area for organizing items',
    },
    {
      label: 'Text',
      type: Tools.TEXT,
      icon: TextIcon,
      hoverText: 'Drag to add new text area',
    },
    {
      label: 'Select',
      type: Tools.SELECT,
      icon: SelectIcon,
      hoverText: 'Select tool',
    },
    {
      label: 'Pan',
      type: Tools.PAN,
      icon: PanIcon,
      hoverText: 'Pan tool',
    },
    {
      label: 'Pen',
      type: Tools.PEN,
      icon: PenIcon,
      hoverText: 'Pen tool',
    },
    {
      label: 'Connect',
      type: Tools.CONNECT,
      icon: ConnectIcon,
      hoverText: 'Connect tool',
    },
    {
      label: 'Delete',
      type: Tools.DELETE,
      icon: TrashIcon,
      hoverText: 'Delete selected item(s)',
      disabled: $selectedShapes.size === 0,
    },
  ];

  const onClick = (type: Tool) => {
    if (type === Tools.DELETE) return canvasStore.deleteShape();
    toolbarModel.changeTool(type);
  };
</script>

<ul class="toolbar" id="toolbar">
  {#each tools as { label, type, icon, hoverText, ...options }}
    <li>
      <span
        tabindex="0"
        role="button"
        class="tool"
        on:click={() => onClick(type)}
        on:keydown={() => onClick(type)}
      >
        <span
          class="icon"
          class:active={$tool === type}
          class:disabled={options?.disabled}
          title={hoverText}
        >
          <svelte:component this={icon} />
        </span>
        <span class="text">{label}</span>
      </span>
    </li>
  {/each}
</ul>

<style>
  .toolbar {
    position: fixed;
    top: 3rem;
    left: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin: 1rem;
    padding: 0.5em 0.4em 0.2em;
    box-shadow: 0 2px 6px 0 #00263a0f;
    background-color: #ffffff;

    border: 2px solid #f4f4f6;
    border-radius: 6px;
    transform: translateX(-50%);
    pointer-events: all;
  }

  .tool {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.2em 0.2em;
  }

  .icon {
    font-size: 1em !important;
    display: inline-block;
    width: 4em;
    min-width: 2em;
    height: 4em;
    padding: 0.5em 0.5rem;
    margin: 0;
    cursor: pointer;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .disabled {
    color: #d3d3d3;
    pointer-events: none;
  }

  .active {
    background-color: #f4f4f6;
  }

  .text {
    font-size: 0.8em;
    margin: 0;
    margin-top: 0.5em;
    text-align: center;
  }
</style>
