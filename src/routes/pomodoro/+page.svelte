<script>
    import { Pomodoro } from "$lib";
    import PomodoroComponent from "$lib/pomodoro/PomodoroComponent.svelte";
    import { onDestroy } from "svelte";
    import { persisted } from "svelte-persisted-store";

    const activityName = persisted("pomodoro-activity-name", "Recherche");
    const pomodoro = new Pomodoro();
    pomodoro.activityName = $activityName;

    onDestroy(() => {
        pomodoro.countdown.stop();
    });

    $effect(() => {
        $activityName = pomodoro.activityName;
    })
</script>

<PomodoroComponent {pomodoro} />
