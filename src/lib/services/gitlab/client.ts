import { VERCEL_URL } from '$env/static/private';
import { supabase } from '$lib/services/supabase'

export class gitlab {
  public token: string | null
  public base_url: string = 'https://gitlab01.copyleft.no/api/v4'

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

  public async projects () {
    return fetch(`${this.base_url}/projects?order_by=last_activity_at&membership=true`, {
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