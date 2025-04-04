import { sendNotification } from "@tauri-apps/plugin-notification";
import { SvelteDate } from "svelte/reactivity";

export class Interval {
    start = new SvelteDate();
    end = new SvelteDate();
    duration = $derived((this.end.getTime() - this.start.getTime()) / 1000);
}
export class Timer {
    notify() {
        sendNotification({
            title: "Timer",
            body: `You have been doing ${this.name.toLowerCase()} for ${this.hours} hours, ${this.minutes} minutes, and ${this.seconds} seconds.`,
        });
    }
    name = $state("Research");
    activeIntervals = $state<Interval[]>([]);
    activeInterval = $derived(this.activeIntervals.at(-1) ?? new Interval());


    pastDuration = $derived.by(() => {
        console.debug("Big duration computation");
        let duration = 0;

        for (let i = 0; i < this.activeIntervals.length - 1; i++) {
            const interval = this.activeIntervals[i];
            duration += interval.duration;
        }
        return duration;
    });

    duration = $derived(this.pastDuration + this.activeInterval.duration);

    hours = $derived(Math.floor(this.duration / 3600));
    minutes = $derived(Math.floor((this.duration % 3600) / 60));
    seconds = $derived(Math.floor(this.duration % 60));
    lastStartDate = $derived(this.activeIntervals.at(-1)?.start ?? new SvelteDate());
    lastEndDate = $derived(this.activeIntervals.at(-1)?.end ?? new SvelteDate());


    private intervalHandle = $state<number>();

    running = $derived(this.intervalHandle !== undefined);

    notifSecs = 0;

    addInterval() {
        this.activeIntervals.push(new Interval());
    }
    start() {
        this.addInterval();
        this.intervalHandle = setInterval(() => {
            this.lastEndDate.setTime(Date.now());
            const secs = Math.floor(this.duration);
            if (secs !== this.notifSecs && secs % 600 === 0) {
                this.notify();
                this.notifSecs = secs;
            }

        }, 500)
    }

    stop() {
        if (this.intervalHandle)
            clearInterval(this.intervalHandle);
        this.intervalHandle = undefined;
    }

    reset() {
        this.activeIntervals.length = 0;
        if (this.running) {
            this.addInterval();
        }
        this.notifSecs = 0;
    }
}