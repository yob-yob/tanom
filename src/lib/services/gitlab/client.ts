import { VERCEL_URL } from '$env/static/private';
import { supabase } from '$lib/services/supabase'

export class gitlab {
  public token: string | null
  public static base_url: string = 'https://gitlab01.copyleft.no/api/v4'

  public constructor(token: string | null) {
    this.token = token
  }

  public static signIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'gitlab', 
      options: {
        scopes: 'read_user read_api',
        redirectTo: VERCEL_URL
      }
    })

    if (error) {
      console.log(error)
    }

    return data;
  }

  public static initFromRefreshToken = async (refresh_token: string | null) => {
    const response = await (await fetch(`${gitlab.base_url}/projects?order_by=last_activity_at&membership=true`)).json();
    return response;
  }

  public async projects () {
    return fetch(`${gitlab.base_url}/projects?order_by=last_activity_at&membership=true`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      }
    }).then((response) => {
      const body = response.json()
      console.log(body)
      return body
    });
  }
}