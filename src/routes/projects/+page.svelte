<script lang="ts">
	import type { PageData } from './$types';
  
  export let data: PageData;

  let projects = data.projects;
</script>

<div>
  <span>Projects</span>
  <a href="/projects/create">create new project</a>
  <!-- List Imported Projects from Git Providers -->
  {#each projects as project}
    {project.name}
  {:else}
    <span>No Projects</span>
  {/each}
</div>