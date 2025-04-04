<script lang="ts">
  import {Timer, TimerComponent} from "$lib";
  import { onMount } from "svelte";
  
  const timer = new Timer();
  
  onMount(() => {
    timer.start();

    return () => {
      timer.stop();
    };
  })
</script>

<main class="container w-screen h-screen grid content-center justify-center">
  <input type="text" class="input input-ghost" bind:value={timer.name}>
  <TimerComponent {timer} />
  <div class="grid grid-cols-2 gap-4">
  <button type="button" class="btn btn-xl" onclick={() => {
    if (timer.running) {
      timer.stop();
    } else {
      timer.start();
    }
  }
  }>{timer.running ? 'Pause' : 'Resume'}</button>
  <button type="button" class="btn btn-xl" onclick={() => {
    timer.reset();
  }}>Reset</button>
  </div>
  
</main>