<script lang="ts" generics="T extends {name: string}">
  import type { HTMLAttributes } from 'svelte/elements';

    interface Props extends HTMLAttributes<HTMLUListElement> {
        values: T[];
        selected?: T;
        onSelect?: (value: T) => void;
    }
    
    let {values, selected = $bindable(), onSelect, ...props}: Props = $props();

    if (values && selected === undefined) {
        selected = values[0]
    }

</script>


<ul {...props} class="{props.class} join grid grid-cols-2 justify-center justify-items-stretch w-fit">
    {#each values as v}
    <li>
        <button class="btn join-item w-full" class:btn-accent={v === selected} onclick={() => {
            if (v !== selected)
            selected = v
            else {
                const i = values.indexOf(v);
                if (i !== -1) {
                    selected = values[(i + 1) % values.length]
                } else {
                    selected = values[0]
                }
            }

            onSelect?.(selected)
        }}>
            {v.name}
        </button>
    </li>
    {/each}

</ul>