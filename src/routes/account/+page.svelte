<script lang="ts">
	import type { PageData } from './$types';

  export let data: PageData;

  const user = data.session.user;
</script>

<div>
  <h1>
    Account page
  </h1>
  
  <a href="/projects">Projects</a>
</div>