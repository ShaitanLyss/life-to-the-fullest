<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Timer } from "./timer.svelte";
  import PaddedNumber from "$lib/PaddedNumber.svelte";

    interface Props extends HTMLAttributes<HTMLElement> {
        timer: Timer;
        size?: string;
        name?: boolean;
        font?: string;
    }
    
    let {timer, size = "text-9xl", font = "font-bold", name = true, ...props}: Props = $props();
</script>

<article {...props} class="grid {props.class}">
  {#if name}
<input type="text" class="input input-ghost" bind:value={timer.name}>
{/if}
<button type="button" class="{size} flex items-center {font} select-none cursor-pointer" ondblclick={(e) => {
  e.preventDefault();
  timer.notify();
}}>
<PaddedNumber bind:value={timer.hours} />
:
<PaddedNumber bind:value={timer.minutes} />
:
<PaddedNumber bind:value={timer.seconds} />
</button>
</article>