<script lang="ts">
	import type { PageData } from './$types';
  
  export let data: PageData;

  let projects = data.projects;
</script>

<div>
  <span>Projects</span>
  <br>
  <a href="/projects/create">create new project</a>
  <br>
  <!-- List Imported Projects from Git Providers -->
  <ul>
    <li>
      {#each projects as project}
        <span>{project.name}</span>
      {:else}
        <span>No Projects</span>
      {/each}
    </li>
  </ul>
</div>