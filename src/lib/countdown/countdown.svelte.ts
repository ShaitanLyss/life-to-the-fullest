import { notify } from "$lib/notification";
import { Timer } from "$lib/timer";
import { isTauri } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";

export class Time {
    /** The time in seconds. */
    time = $state(0);

    #secs = $derived(this.time % 60)

    get secs() {
        return this.#secs;
    }

    set secs(value: number) {
        this.time = this.time - this.#secs + value;
    }

    #mins = $derived(Math.floor(this.time / 60) % 60)
    get mins() {
        return this.#mins;
    }
    set mins(value: number) {
        this.time = this.time - this.#mins * 60 + value * 60;
    }

    #hours = $derived(Math.floor(this.time / 3600))
    get hours() {
        return this.#hours;
    }
    set hours(value: number) {
        this.time = this.time - this.#hours * 3600 + value * 3600;
    }

    clear() {
        this.time = 0;
    }
}


export class Countdown {
    onEnd?: () => void;
    constructor({hours = 0, mins = 0, secs = 0, name = 'Countdown', onEnd, active = false}: {hours?: number; mins?: number; secs?: number, name?: string, onEnd?: () => void, active?: boolean} = {}) {
        this.hours = hours;
        this.mins = mins;
        this.secs = secs;
        this.name = name;
        this.onEnd = onEnd;
        this.active = active;

        if (active) {
            this.timer.start();
        }
    }
    timer = new Timer({
        notify: false,
        name: "Countdown",
        onTick: () => {
            if (this.timer.duration >= this.goal.time) {
                this.stop();

                if (isTauri()) {
                    getCurrentWindow().setFocus();
                }
                
                notify({
                    title: this.name,
                    body: "Time's up!",
                    sound: true,
                });
                this.onEnd?.();

            }
        },
    });
    name = $state("Countdown");
    goal: Time = new Time();
    active = $state(false);

    start() {
        if (this.goal.time <= 0) return;
        this.timer.start();
        this.active = true;
    }

    pause() {
        this.timer.stop();
    }
    resume() {
        this.timer.start();
    }

    stop() {
        this.timer.stop();
        this.active = false;
        this.timer.reset();
    }

    clear() {
        this.stop();
        this.goal.clear();
    }

    set hours(value: number) {
        this.goal.hours = value;
    }
    get hours() {
        return !this.active ? this.goal.hours : Math.floor((this.goal.time - this.timer.duration + 0.99) / 3600);
    }
    set mins(value: number) {
        this.goal.mins = value;
    }
    get mins() {
        return !this.active ? this.goal.mins : Math.floor((this.goal.time - this.timer.duration + 0.99) / 60) % 60;
    }
    set secs(value: number) {
        this.goal.secs = value;
    }
    get secs() {
        return !this.active ? this.goal.secs : Math.floor((this.goal.time - this.timer.duration + 0.99) % 60);
    }

    running = $derived(this.timer.running)
}