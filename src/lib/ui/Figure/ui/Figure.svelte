<script lang="ts">
  import type { ComponentType } from 'svelte';

  import type { Point } from '$lib/services';
  import { Tools, type DrawingTool } from '$lib/ui/Toolbar';
  import { Line, Pen, Rect } from '.';

  export let path: Point[];
  export let type: DrawingTool | null;

  const widgets: Record<DrawingTool, ComponentType> = {
    [Tools.RECT]: Rect,
    [Tools.CONNECT]: Line,
    [Tools.PEN]: Pen,
  };

  const renderWidget = (type: DrawingTool | null) => widgets[type || Tools.CONNECT];
</script>

<svelte:component this={renderWidget(type)} {path} />
