import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
 
export const load = (async (data) => {
  const parent = await data.parent()
  if (!parent.session) {
    throw redirect(302, '/login')
  }

  return {
    session: parent.session
  }
}) satisfies PageServerLoad;