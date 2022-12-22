/**
 * This File is responsible for handling requests to manage the projects table.
 * Keep this file follow the BREAD/CRUD methods as much as possible
 * 
 */

import { fail, type Action } from "@sveltejs/kit";
import CreateProjectRequest from "$lib/http/requests/CreateProjectRequest";

export const create: Action = async ({request, locals}) => {

  const createProjectRequest = new CreateProjectRequest(request)

  const validation = await createProjectRequest.validate()

  if (!validation.success) {
    return fail(422 , { 
      success: false,
      name: "Validation Error",
      message: "Sorry about that, please check the form errors for procceed with submittion.",
      validation: validation.error.issues,
      old: await createProjectRequest.getBody(),
    });
  }

  locals.supabase.from('projects').insert([validation.data])
}