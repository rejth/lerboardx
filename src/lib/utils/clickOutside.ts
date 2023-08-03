interface ClickOutsideOptions {
  enabled?: boolean;
  exclude?: (HTMLElement | null)[];
  handler?: (...arg: any[]) => void;
}

export function clickOutside(node: HTMLElement, options: ClickOutsideOptions) {
  const { exclude = [] } = options;

  const handleClick = (event: Event): void => {
    const target = event.target as HTMLElement;

    if (!event.target || exclude.some((excludedNode) => excludedNode?.contains(target))) {
      return;
    }

    if (!node.contains(target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('outclick'));
    }
  };

  document.addEventListener('mousedown', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('mouseup', handleClick, true);
    },
  };
}
