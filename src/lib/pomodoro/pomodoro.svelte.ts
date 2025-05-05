import { Countdown } from "$lib/countdown";
import { Timer } from "$lib/timer";
import { onDestroy, untrack } from "svelte";

export class Pomodoro {
    shortBreakMins = $state(5);
    longBreakMins = $state(15);
    activityMins = $state(25);
    numPomodoros = $state(4);
    pomodoroNumber = $state(1);
    isOnBreak = $state(false);
    isEndOfCycle = $derived(this.pomodoroNumber % this.numPomodoros == 0);

    activityName = $state("Recherche");

    shortBreakName = $state("Pause Courte");
    longBreakName = $state("Pause Longue");

    info: { name: string, mins: number } = $derived(
        !this.isOnBreak ? {
            name: this.activityName,
            mins: this.activityMins,
        } : this.isEndOfCycle ? {
            name: this.longBreakName,
            mins: this.longBreakMins,
        } : {
            name: this.shortBreakName,
            mins: this.shortBreakMins,
        }
    )

    #countdown = $state.raw(this.createCountdown());

    readonly timer = new Timer({
        name: "Total time",
    })

    get countdown() {
        return this.#countdown;
    }
    constructor() {
        $effect(() => {
            this.updateCountdown();
        })

        $effect(() => {
            const running = this.countdown.running;
            untrack(() => {
                if (running) {
                    this.timer.start();
                } else {
                    this.timer.stop();
                }
            })
        })

        onDestroy(() => {
            this.destroy();
        })
    }

    destroy() {
        this.countdown.stop();
        this.timer.stop();
    }

    private createCountdown() {
        return new Countdown({
            mins: this.info.mins, name: `Pomodoro n°${this.pomodoroNumber}`, active: true, onEnd: () => {
                if (this.isOnBreak) {
                    this.pomodoroNumber++;
                }
                this.isOnBreak = !this.isOnBreak;
            }
        })
    }

    private updateCountdown() {
        untrack(() => {
            if (this.countdown) {
                this.countdown.stop();
            }
        })
        const countdown = this.createCountdown();
        untrack(() => {
            this.#countdown = countdown;
        })
    }

}