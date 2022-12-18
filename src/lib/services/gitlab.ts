import { supabase } from './supabase'

class gitlab {
  public token: string | null
  public base_url: string = 'https://gitlab01.copyleft.no/api/v4'

  public constructor(token: string | null) {
    this.token = token
  }

  public static signIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'gitlab',
      options: {
        scopes: 'read_user read_api'
      }
    })

    if (error) {
      alert(error.message)
    } else {
      console.log(data)
    }
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

export default gitlab