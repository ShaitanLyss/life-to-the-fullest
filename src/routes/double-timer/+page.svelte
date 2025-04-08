<script lang="ts">
  import { Timer } from "$lib";
  import Selector from "$lib/Selector.svelte";
  import TimerDisplay from "$lib/timer/TimerDisplay.svelte";
    import { onDestroy } from "svelte";

  const timerA = new Timer();
    const timerB = new Timer({"name": "Break"});

    const timers = [timerA, timerB];

    timerA.start();

    onDestroy(() => {
        for (const timer of timers) {
            timer.stop();
        }
    });
</script>


<Selector class="mb-4" selected={timerA} values={timers} onSelect={(seleccted) => {
    for (const timer of timers) {
        if (timer === seleccted) continue;

        timer.stop();
    }

    seleccted.start();
}}/>

<ul class="content-center grid gap-4 justify-center justify-items-center">
    {#each timers as timer}
    <li>
        <TimerDisplay {timer} size={"text-9xl"} />
    </li>
    {/each}
</ul>