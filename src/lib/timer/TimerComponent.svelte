<script lang="ts">
  import type { Timer } from "./timer.svelte";

    interface Props {
        timer: Timer;
    }
    
    let {timer}: Props = $props();
</script>

<button type="button" class="text-9xl font-bold mb-16 select-none cursor-pointer" ondblclick={(e) => {
  e.preventDefault();
  timer.notify();
}}>{String(timer.hours).padStart(2, "0")}:{String(timer.minutes).padStart(2, "0")}:{String(timer.seconds).padStart(2, "0")}</button>