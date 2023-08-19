import { on, once, type Target } from './listeners';
import { filter, any, every, sequence, watch, onlyEvent } from './generators';

export function mouseWatcherOnTarget<T, E extends keyof HTMLElementEventMap>(
  target: Target,
  event: E,
): AsyncGenerator<T> {
  const allEvents = () => true;

  return watch(() =>
    filter(
      sequence(
        once(target, 'mousedown'),
        every(any(on(document, 'mousemove'), on(target, 'mouseup')), allEvents),
      ),
      onlyEvent(event),
    ),
  );
}
