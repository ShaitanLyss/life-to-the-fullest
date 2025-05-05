<script lang="ts">
    import TaskList from "./TaskList.svelte";
    import type { Task } from "./types";

    let characteristics = $state({
        nDays: 4,
        swimming: false,
        remoteWork: false,
    });

    type Chars = typeof characteristics;

    type BooleanKeys<T> = {
        [K in keyof T]: T[K] extends boolean ? K : never;
    }[keyof T];

    const { nDays, swimming, remoteWork } = $derived(characteristics);

    const tasks: Task[] = $derived([
        "Douche",
        [
            "Valise",
            [
                ["Vêtements", [`Sous-vêtements x ${nDays}`].concat(swimming ? ["Maillot de bain"] : [])],
                [
                    "Trousse de toilette",
                    [
                        "Rasoir",
                        "Brosse à dents",
                        "Dentifrice",
                        "Gel Douche",
                        "Shampoing",
                    ],
                ],
            ],
        ],
        [
            "Sac à dos",
            [
                "Mouchoirs",
                "Chargeur",
                "Lunette",
                "Gourde",
                "Gel Hydro",
                "Crème Solaire",
                "Livre",
            ],
        ],
        remoteWork && "PC Portable",
    ] as Task[]);
</script>

{#snippet Checkbox(label: string, key: BooleanKeys<Chars>)}
    <label>
        {label}
        <input
            type="checkbox"
            class="checkbox"
            bind:checked={characteristics[key]}
        />
    </label>
{/snippet}

<section data-theme="cupcake" class="p-8 rounded-box h-[80vh] overflow-clip">
    <h1 class="text-4xl font-bold mb-8">Préparatifs de Voyage</h1>
    <fieldset class="fieldset mb-4">
        <legend class="fieldset-legend">Caractéristiques</legend>
        <label class="input">
            <input
                type="number"
                class=""
                bind:value={characteristics["nDays"]}
                min="0"
                step="1"
            />
            Jours
        </label>
        {@render Checkbox("Baignade", "swimming")}
        {@render Checkbox("Télé-Travail", "remoteWork")}
    </fieldset>
    <fieldset class="fieldset">
        <legend class="fieldset-legend"> Tâches </legend>
        <TaskList {tasks} class="text-sm overflow-y-auto h-2/3" />
    </fieldset>
</section>
