<script lang="ts">
  import type { ComponentType } from 'svelte';

  import { Tools, type DrawingTool, type Point } from '$lib/types';
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
