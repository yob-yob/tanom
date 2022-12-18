<script lang="ts">
  import { supabase } from '$lib/services/supabase'
	import { goto } from '$app/navigation';

  let loading = false
  let email: string
  let password: string

  const handleRegister = async () => {
    try {
      loading = true
      console.log({ email, password })
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      console.log(data);
      if (data.user) {
        return goto('/login');
      }
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
    Register
  
    <div class="border p-5">
      <form action="" on:submit|preventDefault="{handleRegister}">
        <div>
          <label for="email">Email</label>
          <input type="text" name="email" id="email" bind:value={email}>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" bind:value={password}>
        </div>
        <button type="submit" class="bg-green-300">Register</button>
      </form>
    </div>
  </div>
</div>