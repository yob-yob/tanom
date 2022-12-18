import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import gitlab from '$lib/services/gitlab'
 
export const load = (async (data) => {
  const parent = await data.parent()
  if (parent.session === null) {
    throw redirect(302, '/login')
  }

  if (!parent.session.user.app_metadata.providers.includes('gitlab')) {
    throw redirect(302, '/account')
  }

  console.log(parent.session.user)

  if (parent.session.provider_token === null || parent.session.provider_token === undefined) {
    throw redirect(302, '/account')
  }

  return {
    projects: await new gitlab(parent.session.provider_token).projects()
  }
}) satisfies PageLoad;