// [id]/+page.js

import { trainings, settings } from "$stores/stores";

export async function load({ params }) {
  const id = params.id;
  return { id };
}
