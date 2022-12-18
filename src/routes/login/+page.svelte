<script lang="ts">
  import { supabase } from '$lib/services/supabase'
  import gitlab from '$lib/services/gitlab'

  let loading = false
  let email: string
  let password: string

  const handleLogin = async () => {
    try {
      loading = true
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      console.log(data);
      alert('Logged In')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      loading = false
    }
  }
</script>

<div class="w-scree h-screen grid place-items-center">
  <div>
    Login
  
    <div class="border p-5">
      <form action="" on:submit|preventDefault="{handleLogin}">
        <div>
          <label for="email">Email</label>
          <input type="text" name="email" id="email" bind:value="{email}">
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" bind:value="{password}">
        </div>
        <button type="submit" disabled="{loading}" class="bg-green-300">Login</button>
      </form>
      <button on:click="{gitlab.signIn}">Login Directly Using Gitlab</button>
    </div>
  </div>
</div>