import { Countdown } from "$lib/countdown";

export class Pomodoro {
    shortBreakMins = $state(5);
    longBreakMins = $state(15);
    activityMins = $state(25);
    numPomodoros = $state(4);
    pomodoroNumber = $state(1);
    isOnBreak = $state(false);
    isEndOfCycle = $derived(this.pomodoroNumber % this.numPomodoros == 0);

    #activityName = $state("Recherche");

    get activityName() {
        if (this.isOnBreak) {
            return this.#activityName;
        }
        return this.countdown.name;
    }

    set activityName(value: string) {
        this.#activityName = value;
        if (!this.isOnBreak)
            this.countdown.name = value;
    }
    shortBreakName = $state("Pause Courte");
    longBreakName = $state("Pause Longue");

    info: { name: string, mins: number } = $derived(
        !this.isOnBreak ? {
            name: this.#activityName,
            mins: this.activityMins,
        } : this.isEndOfCycle ? {
            name: this.longBreakName,
            mins: this.longBreakMins,
        } : {
            name: this.shortBreakName,
            mins: this.shortBreakMins,
        }
    )

    countdown = $derived(
        new Countdown({
            ...this.info, active: true, onEnd: () => {
                if (this.isOnBreak) {
                    this.pomodoroNumber++;
                }
                this.isOnBreak = !this.isOnBreak;
            }
        }),
    );

}