<script lang="ts">
  import {Timer, TimerDisplay} from "$lib";
  import { onMount } from "svelte";
  
  const timer = new Timer({notify: true});
  
  onMount(() => {
    timer.start();

    return () => {
      timer.stop();
    };
  })
</script>

<main class="container w-screen h-screen grid content-center justify-center">
  
  <TimerDisplay {timer} class="mb-16" />
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