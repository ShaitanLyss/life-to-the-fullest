<script lang="ts">
    import type { Task } from "./types";
    import TaskList from "./TaskList.svelte";
    import { checkbox } from "@selenite/commons";

    interface Props {
        tasks: Task[];
        class?: string;
    }

    let { tasks, class: classes = "" }: Props = $props();
</script>

{#snippet Task(task: string)}
    <label class="flex gap-2 items-center">
        <input type="checkbox" class="checkbox" use:checkbox />
        <span class="select-none cursor-pointer">{task}</span>
    </label>
{/snippet}

<div class="grid gap-4 {classes}">
    {#each tasks as task}
        {#if typeof task === "string"}
            {@render Task(task)}
        {:else if typeof task === "boolean"}
            <!-- Skip -->
        {:else}
            {@const { name, subtasks } = Array.isArray(task)
                ? { name: task[0], subtasks: task[1] }
                : task}
            {@render Task(name)}
            <TaskList tasks={subtasks} class="ms-8" />
        {/if}
    {/each}
</div>
