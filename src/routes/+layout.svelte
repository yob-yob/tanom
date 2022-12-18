<script type="ts">
  import { page } from '$app/stores'
  import { supabase } from '$lib/services/supabase'
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import "../app.css";

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      invalidate('supabase:auth')
    })

    return () => {
      subscription.unsubscribe()
    }
  })

  async function signOut() {
    const { error } = await supabase.auth.signOut()
  }
</script>

<header>
<!-- Header stuff -->
<nav class="p-5 flex justify-end">
  <div class="flex space-x-5">
    <a href="/">Home</a>
    {#if !$page.data.session}
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    {:else}
      <a href="/account">Account</a>
      <button on:click="{signOut}">logout</button>
    {/if}
  </div>
</nav>
</header>
<main>
  <slot />
</main>
<footer>
<!-- Footer Stuff -->
</footer>