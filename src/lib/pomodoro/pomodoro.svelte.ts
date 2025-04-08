import { Countdown } from "$lib/countdown";

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

    countdown = $derived(
        new Countdown({
            mins: this.info.mins, name: `Pomodoro n°${this.pomodoroNumber}`, active: true, onEnd: () => {
                if (this.isOnBreak) {
                    this.pomodoroNumber++;
                }
                this.isOnBreak = !this.isOnBreak;
            }
        }),
    );

}