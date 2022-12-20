import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { gitlab } from '$lib/services/gitlab'
import type { Actions } from './$types';
 
export const load = (async (data) => {
  const parent = await data.parent()
  if (parent.session === null) {
    throw redirect(302, '/login')
  }

  if (!parent.session.user.app_metadata.providers.includes('gitlab')) {
    throw redirect(302, '/account')
  }


  if (parent.session.provider_token === null || parent.session.provider_token === undefined) {
    const { provider, url } = await gitlab.signIn()
    if (url) {
      throw redirect(302, url);
    } else {
      throw redirect(304, '/projects');
    }
  }

  return {
    session: parent.session,
    gitlab: {
      projects: await new gitlab(parent.session.provider_token).projects()
    }
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  createProject: async ({request, locals}) => {

  }
}

