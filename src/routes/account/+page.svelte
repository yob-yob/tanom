<script type="ts">
  import { page } from '$app/stores'
  import gitlab from '$lib/services/gitlab';

  const user = $page.data.session.user;
</script>

<div>
  <h1>
    Account page
  </h1>
  
  {#if !user.app_metadata.providers.includes('gitlab')}
    <p>Link Gitlab Account</p>
    <button class="btn" on:click={gitlab.signIn}>Sign-in your GitLab Account</button>
  {:else}
    <a href="/projects">Gitlab Projects</a>
  {/if}
</div>