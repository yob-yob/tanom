import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (async (data) => {
  const parent = await data.parent()
  if (parent.session) {
    throw redirect(302, '/account')
  }
}) satisfies PageLoad;