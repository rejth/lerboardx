export function validateUuid(str: string): boolean {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(str);
}

type F = (...args: any[]) => void;

export function throttle(fn: F, delay: number): F {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: any[];

  return function wrapper(this: typeof wrapper, ...args) {
    lastArgs = args;
    if (timer) return;

    fn.apply(this, args);

    timer = setTimeout(() => {
      timer = undefined;
      if (lastArgs !== args) {
        wrapper.apply(this, lastArgs);
      }
    }, delay);
  };
}
