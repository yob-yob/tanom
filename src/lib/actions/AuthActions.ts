import { AuthApiError } from "@supabase/supabase-js"
import { error, fail, redirect, type Action } from "@sveltejs/kit";
import LoginRequest from "$lib/http/requests/LoginRequest"
import RegisterRequest from "$lib/http/requests/RegisterRequest"

export const login: Action = async ({ request, locals }) => {
  const LoginForm = new LoginRequest(request)

  const validation = await LoginForm.validate();

  if (!validation.success) {
    return fail(422 , { 
      success: false,
      name: "Validation Error",
      message: "Sorry about that, please check the form errors for procceed with submittion.",
      validation: validation.error.issues,
      old: await LoginForm.getBody(),
    });
  }
  
  const { data, error: err } = await locals.supabase.auth.signInWithPassword(validation.data)

  if (err) {
    if (err instanceof AuthApiError) {
      return fail(err.status , { 
        success: false,
        name: err.name,
        message: err.message,
        validation: [],
        old: validation.data,
      });
    }
    return fail(422, { 
      success: false,
      name: "Authentication Error",
      message: err.message,
      validation: [],
      old: validation.data,
    })
  }

  console.log('AuthActions Login data: ', data);

  throw redirect(302, '/account');
}

export const logout: Action = async ({ locals }) => {
  const {error: err} = await locals.supabase.auth.signOut();

  if (err) {
    console.log('Error Logging Out', err)
    throw error(500, "Server fail");
  }

  throw redirect(302, '/');
}

export const register: Action = async ({ request, locals }) => {
  const RegisterForm = new RegisterRequest(request)

  const { data, error: err } = await locals.supabase.auth.signUp(await RegisterForm.validate())

  if (err) {
    if (err instanceof AuthApiError) {
      return fail(err.status, {...err.toJSON(), error: err.message})
    }
    return fail(500, { error: "Server Fail" })
  }

  console.log('AuthActions Logout data: ', data);

  throw redirect(302, '/login');
}