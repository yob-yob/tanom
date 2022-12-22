import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { gitlab } from '$lib/services/gitlab'
import type { Actions } from './$types';
import { create } from '$lib/http/controllers/ProjectController'

export const load = (async (data) => {
  const session = data.locals.session;
  if (session === null) {
    throw redirect(302, '/login')
  }

  if (!session.user.app_metadata.providers.includes('gitlab')) {
    throw redirect(302, '/account')
  }


  if (session.provider_token === null || session.provider_token === undefined) {
    console.log("Reauthenticating to Gitlab oAuth");
    const { provider, url } = await gitlab.signIn()
    if (url) {
      throw redirect(302, url);
    } else {
      throw redirect(304, '/projects');
    }
  } else {
    console.log(`Already authenticated to Gitlab oAuth using token: ${session.provider_token}`);
    // Check if user has an updated refresh_token
    // if (session.provider_refresh_token !== session.user.user_metadata.gitlab_refresh_token) {
      // console.log('User gitlab_refresh_token is out of date')
      // console.log(session);
      // We should update the gitlab_refresh_token of the user.
    // }
  }

  return {
    session: session,
    gitlab: {
      projects: await new gitlab(session.provider_token).projects()
    }
  }
}) satisfies PageServerLoad;

export const actions: Actions = {
  create
}

