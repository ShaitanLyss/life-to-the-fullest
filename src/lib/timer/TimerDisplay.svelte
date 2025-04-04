<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Timer } from "./timer.svelte";

    interface Props extends HTMLAttributes<HTMLElement> {
        timer: Timer;
        size?: string;
        
    }
    
    let {timer, size = "text-9xl", ...props}: Props = $props();
</script>

<article {...props} class="grid {props.class}">
<input type="text" class="input input-ghost" bind:value={timer.name}>
<button type="button" class="{size} font-bold select-none cursor-pointer" ondblclick={(e) => {
  e.preventDefault();
  timer.notify();
}}>{String(timer.hours).padStart(2, "0")}:{String(timer.minutes).padStart(2, "0")}:{String(timer.seconds).padStart(2, "0")}</button>
</article>