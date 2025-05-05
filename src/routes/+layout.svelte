<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  let { children } = $props();
</script>

<div class="relative w-screen h-screen grid content-center justify-center items-center align-middle justify-items-center">
  <header class="absolute top-0 left-0 right-0 p-4 flex justify-center group">
    <ul class="menu menu-horizontal gap-1 p-4 bg-base-300 rounded-box -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
      {#snippet Link(href: string, label: string)}
      <li>
        <a {href} class=" {page.url.pathname === href && 'bg-primary  text-primary-content'}">{label}</a>
        </li>
      {/snippet}
      {@render Link("/", "Timer")}
      {@render Link("/double-timer", "Duo")}
      {@render Link("/countdown", "Countdown")}
      {@render Link("/pomodoro", "Pomodoro")}
      {@render Link("/trip-preparation", "Trip Prep")}
      
    </ul> 
  </header>

  {@render children()}
</div>