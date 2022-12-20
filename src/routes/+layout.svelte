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
      <form action="/logout" method="POST">
        <button type="submit">logout</button>
      </form>
    {/if}
  </div>
</nav>
</header>
<main class="container mx-auto px-5 mb-10">
  <slot />
</main>
<footer>
<!-- Footer Stuff -->
</footer>