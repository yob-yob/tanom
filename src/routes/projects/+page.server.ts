import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
 
export const load = (async (data) => {
  const parent = await data.parent()

  if (parent.session === null) {
    throw redirect(302, '/login')
  }

  if (!parent.session.user.app_metadata.providers.includes('gitlab')) {
    throw redirect(302, '/account')
  }

  const { data: projects, error: err } = await data.locals.supabase.from('projects').select();

  if (err) {
    throw error(402, err.message)
  }

  return {
    session: parent.session,
    projects: projects
  }
}) satisfies PageServerLoad;