<script lang="ts">
  import LoginRequest from "$lib/requests/LoginRequest";
	import type { ActionData } from "./$types";
	import { ValidationMessageBag } from "$lib/helpers/MessageBag";

  const validator = LoginRequest.validator();

  let loading = false
  let MessageBag: ValidationMessageBag<typeof validator> = ValidationMessageBag.fromZodIssues([]);

  export let form: ActionData;

  let email: string;
  let password: string;

  if (form) {
    MessageBag = ValidationMessageBag.fromZodIssues(form.validation)  
    email = form.old?.email;
    password = form.old?.password;
  }
</script>

<div class="w-scree h-screen grid place-items-center">
  <div>
    Login
  
    <div class="border p-5">
      <form action="?/login" method="POST">
        {#if form && !form.succeess}
           <span>{form.message}</span>
        {/if}
        <div>
          <label for="email">Email</label>
          <input type="email" name="email" id="email" bind:value={email} required>
          {#if MessageBag.has('email')}
            <p class="error">
              {MessageBag.get('email')}
            </p>
          {/if}
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" bind:value={password}>
        </div>
        <button type="submit" disabled="{loading}" class="bg-green-300">Login</button>
      </form>
    </div>
  </div>
</div>