// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface Platform {}
  }

  namespace svelteHTML {
    interface HTMLAttributes<T> {
      'on:outclick'?: (e: CustomEvent) => void;
      'on:insideclick'?: (e: CustomEvent) => void;
    }
  }
}

export {};
