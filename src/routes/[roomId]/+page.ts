export const prerender = false;
export const ssr = false;

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    roomId: params.roomId,
  };
}
