<script lang="ts">
  import { Connections, type ConnectionNode } from '$lib/ui/Drawing';

  export let node: ConnectionNode;
  let nodeRef: HTMLDivElement;

  $: grabberStyle = `
    top: ${node.position.y}px;
    left: ${node.position.x}px;
    z-index: 200000001;
  `;

  $: nodeStyle = `
    transform: rotate(${node.angle}deg);
  `;
</script>

<div class="node-grabber" style={grabberStyle}>
  <div
    class="connection-node"
    class:dot={node.type === Connections.MIDDLE}
    class:arrow={node.type === Connections.TARGET}
    class:selected={node.selected}
    style={nodeStyle}
    bind:this={nodeRef}
  />
</div>

<style>
  .node-grabber {
    position: absolute;
    width: min(4em, 2rem);
    height: min(4em, 2rem);
    transform: translate(-50%, -50%);

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    z-index: 100000;
    cursor: pointer;

    background: transparent;
  }

  .connection-node {
    position: absolute;
    width: max(0.4em, 6px);
    height: max(0.4em, 6px);
    cursor: pointer;
  }

  .dot {
    width: max(0.3em, 6px);
    height: max(0.3em, 6px);
    border-radius: 50%;
    background-color: #444444;
  }

  .dot.selected {
    background-color: #35b2dc;
  }

  .arrow {
    box-shadow: none;
    background: transparent;
    width: 0;
    height: 0;
    border-top: max(0.2em, 3px) solid transparent;
    border-left: max(0.6em, 8px) solid #444444;
    border-bottom: max(0.2em, 3px) solid transparent;
  }

  .arrow.selected {
    border-top: max(0.3em, 4.5px) solid transparent;
    border-left: max(0.9em, 12px) solid #35b2dc;
    border-bottom: max(0.3em, 4.5px) solid transparent;
  }
</style>
