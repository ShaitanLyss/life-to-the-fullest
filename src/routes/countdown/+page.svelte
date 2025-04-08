<script lang="ts">
  import { Countdown, CountdownComponent } from "$lib";
  import PaddedNumber from "$lib/PaddedNumber.svelte";
  import { persisted } from "svelte-persisted-store";

 

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

<CountdownComponent {countdown} />
