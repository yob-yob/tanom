import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types';
import { login } from "$lib/actions/AuthActions"
 
export const load = (async (data) => {
  console.log('login server load running')
  const parent = await data.parent()
  if (parent.session) {
    throw redirect(303, '/account')
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  login
}