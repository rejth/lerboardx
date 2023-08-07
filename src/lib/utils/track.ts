import { on, once, type Target } from './listeners';
import { filter, any, every, sequence, watch } from './generators';

const allEvents = () => true;

export function mouseWatcher<T>(target: Target): AsyncGenerator<T> {
  return watch(() =>
    filter(
      sequence(
        once(target, 'mousedown'),
        every(any(on(document, 'mousemove'), on(document, 'mouseup')), allEvents),
      ),
      allEvents,
    ),
  );
}
