<script lang="ts">
  import { onDestroy } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface Props extends HTMLAttributes<HTMLElement> {
    value: number;
    max?: number;
    length?: number;
    editable?: boolean;
    increment?: (value: number) => void;
  }

  let {
    value = $bindable(),
    length = 2,
    max = 60,
    editable = false,
    increment,
    ...props
  }: Props = $props();

  function applyIncr(incr = 1) {
    value = (max + value + incr) % max;
  }

  let timeout: number | undefined;
  let interval: number | undefined;

  function cleanUp() {
    clearTimeout(timeout);
    clearInterval(interval);
  }

  onDestroy(() => {
    cleanUp();
  });
</script>

{#snippet btn({
  class: classes,
  content,
  incr = 1,
}: {
  class: string;
  content: string;
  incr?: number;
})}
  {#if editable}
    <button
      type="button"
      class=" absolute left-0 right-0 btn {classes}"
      onpointerdown={() => {
        cleanUp();

        window.addEventListener(
          "pointerup",
          () => {
            cleanUp();
          },
          { once: true },
        );
        increment ? increment(incr) : applyIncr(incr);

        timeout = setTimeout(() => {
          interval = setInterval(() => {
            applyIncr(incr);
          }, 2000 / max);
        }, 200);
      }}
      >{content}
    </button>
  {/if}
{/snippet}

<div class="relative align-middle">
  {@render btn({ class: "-top-10", content: "^" })}
  <div {...props}>{value.toString().padStart(length, "0")}</div>
  {@render btn({ class: "-bottom-13", content: "v", incr: -1 })}
</div>
