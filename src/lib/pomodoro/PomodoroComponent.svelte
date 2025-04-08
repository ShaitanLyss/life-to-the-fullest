<script lang="ts">
    import { CountdownComponent } from "$lib/countdown";
  import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
    import type { Pomodoro } from "./pomodoro.svelte";

    interface Props {
        pomodoro: Pomodoro;
    }
    
    let {pomodoro}: Props = $props();
</script>

<section class="flex">
    <fieldset
        class="fieldset w-3xs bg-base-200 border border-base-300 p-4 rounded-box"
    >
        <legend class="fieldset-legend">Configuration</legend>

        {#snippet input({
            label,
            field,
            suffix = "mins",
            type = "number",
            ...props
        }: {
            label: string;
            field: keyof Pomodoro;
            suffix?: string;
        } & HTMLInputAttributes)}
            <span class="fieldset-label">{label}</span>
            <div class="input">
                <input
                    {type}
                    {...props}
                    bind:value={pomodoro[field]}
                    min="0"
                />
                {#if suffix}
                <p class="label">mins</p>
                {/if}
            </div>
        {/snippet}

        {@render input({ label: "Nom de l'activité", field: "activityName", suffix:"", type: "text", placeholder: "Nom de l'activité"})}
        {@render input({ label: "Pomodoros", field: "numPomodoros", suffix: "" })}
        {@render input({ label: "Durée", field: "activityMins" })}
        {@render input({ label: "Pause courte", field: "shortBreakMins" })}
        {@render input({ label: "Pause longue", field: "longBreakMins" })}
    </fieldset>
    <section class="w-md p-4 justify-center grid">
        <h1 class="font-bold text-2xl">
            {pomodoro.info.name}
            <!-- Pomodoro n°{pomodoro.pomodoroNumber} -->
        </h1>
        <CountdownComponent
            countdown={pomodoro.countdown}
            editable={false}
            hours={false}
            clear={false}
        />
    </section>
</section>
