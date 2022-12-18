<script type="ts">
  import { page } from '$app/stores'

  const user = $page.data.session.user
  let projects = $page.data.projects;
</script>

<div>
  List Of Gitlab Projects
  <ul>
    {#each projects as project}
       <li>{project.name}</li>
    {/each}
  </ul>
</div>