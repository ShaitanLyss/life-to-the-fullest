<script lang="ts">
  import PaddedNumber from "$lib/PaddedNumber.svelte";
  import type { Countdown } from "./countdown.svelte";

  interface Props {
    countdown: Countdown;
    editable?: boolean;
    hours?: boolean;
    clear?: boolean;
    onPause?: () => void;
    onStop?: () => void;
    buttons?: boolean;
  }

  let {
    countdown,
    editable = true,
    hours = true,
    clear = true,
    buttons = true,
    onPause,
    onStop,
  }: Props = $props();
</script>

<div>
  <input
    type="text"
    class="input input-ghost -left-2.5"
    bind:value={countdown.name}
    readonly={!editable}
  />
  <div class="flex text-9xl font-bold my-12">
    {#if hours}
      <PaddedNumber
        value={countdown.hours}
        {editable}
        max={24}
        increment={(incr) => (countdown.goal.hours += incr)}
      />
      :
    {/if}
    <PaddedNumber
      value={countdown.mins}
      {editable}
      increment={(incr) => (countdown.goal.mins += incr)}
    />
    :
    <PaddedNumber
      value={countdown.secs}
      {editable}
      increment={(incr) => (countdown.goal.secs += incr)}
    />
  </div>
</div>

{#if buttons}
<div class="gap-2 mt-10 flex justify-center">
  <button
    type="button"
    class="btn btn-xl btn-primary w-36"
    onclick={() => {
      if (countdown.active) {
        if (countdown.running) {
          countdown.pause();
          onPause?.()
        } else {
          countdown.resume();
        }
      } else {
        countdown.start();
      }
    }}
    >{countdown.active
      ? countdown.running
        ? "Pause"
        : "Resume"
      : "Start"}</button
  >
  <button
    type="button"
    class="btn btn-xl btn-secondary w-36"
    onclick={() => {
      countdown.stop();
      onStop?.();
    }}>Stop</button
  >
  {#if clear}
    <button
      type="button"
      class="btn btn-xl btn-neutral"
      onclick={() => countdown.clear()}>Clear</button
    >
  {/if}
</div>
{/if}
