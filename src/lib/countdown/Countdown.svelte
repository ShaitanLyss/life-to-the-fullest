<script lang="ts">
    import PaddedNumber from "$lib/PaddedNumber.svelte";
    import type { Countdown } from "./countdown.svelte";

    interface Props {
        countdown: Countdown;
        editable?: boolean;
        hours?: boolean;
        clear?: boolean;
    }
    
    let {countdown, editable = true, hours = true, clear = true}: Props = $props();
</script>

<div>
<input type="text" class="input input-ghost -left-2.5" bind:value={countdown.name}>
<div class="flex text-9xl font-bold my-12">{#if hours}
  <PaddedNumber bind:value={countdown.hours} {editable} max={24} />
  :
  {/if}
  <PaddedNumber bind:value={countdown.mins} {editable} />
  :
  <PaddedNumber bind:value={countdown.secs} {editable} />
</div>
</div>

<div class="gap-2 mt-10 flex justify-center">
<button
  type="button"
  class="btn btn-xl btn-primary w-36"
  onclick={() => countdown.active ? countdown.running ? countdown.pause() : countdown.resume() : countdown.start()}>{countdown.active ? countdown.running ? 'Pause' : 'Resume' : 'Start'}</button
>
<button
  type="button"
  class="btn btn-xl btn-secondary w-36"
  onclick={() => countdown.stop()}>Stop</button
>
{#if clear}
<button
  type="button"
  class="btn btn-xl btn-neutral"
  onclick={() => countdown.clear()}>Clear</button
>
{/if}
</div>