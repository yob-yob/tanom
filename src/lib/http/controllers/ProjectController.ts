/**
 * This File is responsible for handling requests to manage the projects table.
 * Keep this file follow the BREAD/CRUD methods as much as possible
 * 
 */


import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  create: async ({request, locals}) => {

    

    locals.supabase.from('projects').insert([{
      
    }])
  }
}