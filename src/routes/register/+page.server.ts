import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types';
import { register } from "$lib/actions/AuthActions"
 
export const load = (async (data) => {
  const parent = await data.parent()
  if (parent.session) {
    throw redirect(303, '/account')
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  register
}