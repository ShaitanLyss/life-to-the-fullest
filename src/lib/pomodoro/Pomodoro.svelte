<script lang="ts">
    import { CountdownComponent, Countdown } from "$lib/countdown";

    class Pomodoro {
        shortBreakMins = $state(5);
        longBreakMins = $state(15);
        activityMins = $state(25);
        numPomodoros = $state(4);
        pomodoroNumber = $state(1);
        isOnBreak = $state(false);
        isEndOfCycle = $derived(this.pomodoroNumber % this.numPomodoros == 0);

        info: {name: string, mins: number} = $derived(
            !this.isOnBreak ? {
                name: "Pomodoro",
                mins: this.activityMins,
            } : this.isEndOfCycle ? {
                name: "Pause Longue",
                mins: this.longBreakMins,
            } : {
                name: "Pause Courte",
                mins: this.shortBreakMins,
            }
        )

        countdown = $derived(
            new Countdown({...this.info, active: true, onEnd: () => {
                if (this.isOnBreak) {
                    this.pomodoroNumber++;
                }
                this.isOnBreak = !this.isOnBreak;
            }}),
        );

    }
    
    const pomodoro = new Pomodoro();
</script>

<section class="flex">
    <fieldset
        class="fieldset w-3xs bg-base-200 border border-base-300 p-4 rounded-box"
    >
        <legend class="fieldset-legend">Configuration</legend>

        {#snippet input({
            label,
            field,
        }: {
            label: string;
            field: keyof Pomodoro;
        })}
            <label class="fieldset-label">{label}</label>
            <div class="input">
                <input
                    type="number"
                    class=""
                    bind:value={pomodoro[field]}
                    min="0"
                />
                <p class="label">mins</p>
            </div>
        {/snippet}

        {@render input({ label: "Pomodoros", field: "numPomodoros" })}
        {@render input({ label: "Durée", field: "activityMins" })}
        {@render input({ label: "Pause courte", field: "shortBreakMins" })}
        {@render input({ label: "Pause longue", field: "longBreakMins" })}
    </fieldset>
    <section class="w-md p-4 justify-center grid">
        <h1 class="font-bold text-2xl">
            Pomodoro n°{pomodoro.pomodoroNumber}
        </h1>
        <CountdownComponent
            countdown={pomodoro.countdown}
            editable={false}
            hours={false}
            clear={false}
        />
    </section>
</section>
