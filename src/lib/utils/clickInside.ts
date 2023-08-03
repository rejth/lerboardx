interface ClickInsideOptions {
  enabled?: boolean;
  exclude?: (HTMLElement | null)[];
  handler?: (...arg: any[]) => void;
}

export function clickInside(node: HTMLElement, options: ClickInsideOptions) {
  const { exclude = [] } = options;

  const handleClick = (event: Event): void => {
    const target = event.target as HTMLElement;

    if (!event.target || exclude.some((excludedNode) => excludedNode?.contains(target))) {
      return;
    }

    if (node.contains(target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('insideclick'));
    }
  };

  node.addEventListener('mousedown', handleClick, true);

  return {
    destroy() {
      node.removeEventListener('mouseup', handleClick, true);
    },
  };
}
