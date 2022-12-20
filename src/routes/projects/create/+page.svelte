<script lang="ts">
  import type { PageData } from './$types';
  import Icon from '@iconify/svelte';
  import gitlab from '$lib/services/gitlab'
  import Time from "svelte-time";

  export let data: PageData;

  let projects = data.gitlab.projects;
</script>


<div>
  <!-- Should Choose A Provider: But for now prioritize gitlab -->
  <h1>Gitlab Projects</h1>
  <ul class="space-y-3">
    {#each projects as project}
       <li class="border p-2 rounded">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div>
              <!-- src="{project.avatar_url ? project.avatar_url : `https://ui-avatars.com/api/?name=${project.name}`}"  -->
              <img 
                src="{`https://ui-avatars.com/api/?name=${project.name}`}" 
                alt="{project.path_with_namespace}" 
                class="w-10 h-10 rounded-full">
            </div>
            <div class="flex items-center space-x-3">
              <span>{project.name}</span>
              {#if project.visibility === 'private'}
                <Icon icon="heroicons:lock-closed" />
              {:else if  project.visibility === 'internal'}
                <Icon icon="heroicons:building-office-2" />
              {:else}
                <Icon icon="heroicons:globe-asia-australia" />
              {/if}
              <span> . </span>
              <div>
                <Time relative bind:timestamp="{project.last_activity_at}" />
              </div>
            </div>
          </div>
          <form action="?/import">
            <button type="submit" class="bg-blue-400 p-2 rounded" on:click="{gitlab.import()}">Import</button>
          </form>
        </div>
       </li>
    {/each}
  </ul>
</div>