<script lang="ts">
  import { Timer } from "$lib";
  import PaddedNumber from "$lib/PaddedNumber.svelte";
  import {  sendNotification,  } from "@tauri-apps/plugin-notification";
  import { persisted } from "svelte-persisted-store";

  class Time {
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


  class Countdown {
    timer = new Timer({
      notify: false,
      name: "Countdown",
      onTick: () => {
        if (this.timer.duration >= this.goal.time) {
          this.stop();
          
          sendNotification({
            title: this.name,
            body: "Time's up!", 
          });
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
        return !this.active ? this.goal.mins : Math.floor((this.goal.time - this.timer.duration + 0.99 ) / 60) % 60;
    }
    set secs(value: number) {
        this.goal.secs = value;
    }
    get secs() {
        return !this.active ? this.goal.secs : Math.floor((this.goal.time - this.timer.duration + 0.99) % 60);
    }
    
    running = $derived(this.timer.running)
  }

    const countdown = new Countdown();
    let  savedGoal = persisted('countdown-goal', 0);
    let savedName = persisted('countdown-name', 'Terraform Tactics!');
    
    countdown.goal.time = $savedGoal;

    $effect(() => {
        $savedGoal = countdown.goal.time;
    })
    
    countdown.name = $savedName;
    $effect(() => {
        $savedName = countdown.name;
    })

    

</script>

<div>
<input type="text" class="input input-ghost -left-2.5" bind:value={countdown.name}>
<div class="flex text-9xl font-bold my-12">
  <PaddedNumber bind:value={countdown.hours} editable={true} max={24} />
  :
  <PaddedNumber bind:value={countdown.mins} editable={true} />
  :
  <PaddedNumber bind:value={countdown.secs} editable={true} />
</div>
</div>

<div class="gap-2 mt-10">
<button
  type="button"
  class="btn btn-xl btn-primary w-36"
  onclick={() => countdown.active ? countdown.running ? countdown.pause() : countdown.resume() : countdown.start()}>{countdown.active ? countdown.running ? 'Pause' : 'Resume' : 'Start'}</button
>
<button
  type="button"
  class="btn btn-xl btn-secondary w-36"
  onclick={() => countdown.stop()}>Stop</button
>
<button
  type="button"
  class="btn btn-xl btn-neutral"
  onclick={() => countdown.clear()}>Clear</button
>
</div>
