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
        [
          "Vêtements",
          [
            "Pyjama",
            `T-Shirt x ${nDays}`,
            `Sous-vêtements x ${nDays}`,
            `Chaussettes x ${nDays}`,
            `Shorts x ${Math.floor(nDays / 2)}`,
            `Chemise x ${Math.floor(nDays / 3)}`,
            `Pantalon x ${Math.floor(nDays / 3)}`,
            `Pull x ${Math.floor(nDays / 3)}`,
          ].concat(
            swimming
              ? ["Maillot de bain", "Serviette de bain", "Bonnet de bain"]
              : [],
          ),
        ],
        ["Trousse de bijoux"],
        [
          "Trousse de toilette",
          [
            "Rasoir",
            "Brosse à dents",
            "Dentifrice",
            "Gel Douche",
            "Shampoing",
            "Savon visage",
            "Crème visage",
          ],
        ],
        "Sac à linge sale",
        `Chaussures x ${1}`,
      ],
    ],
    ["Sur soi", ["Manteau"]],
    [
      "Sac à dos",
      [
        "Casquette",
        "Écouteurs",
        "Musique",
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
  <label class="w-full flex justify-between">
    {label}
    <input
      type="checkbox"
      class="checkbox"
      bind:checked={characteristics[key]}
    />
  </label>
{/snippet}

<section
  data-theme="cupcake"
  class="p-8 rounded-box h-[80vh] overflow-clip min-w-[33vw] flex flex-col items-start justify-start self-stretch justify-self-stretch"
>
  <h1 class="text-4xl font-bold mb-8">Préparatifs de Voyage</h1>
  <fieldset class="fieldset mb-4 w-full">
    <legend class="fieldset-legend">Caractéristiques</legend>
    <label class="input w-full">
      <input
        type="number"
        class="w-full"
        bind:value={characteristics["nDays"]}
        min="0"
        step="1"
      />
      Jours
    </label>
    {@render Checkbox("Baignade", "swimming")}
    {@render Checkbox("Télé-Travail", "remoteWork")}
  </fieldset>
  <fieldset class="fieldset overflow-y-scroll py-4 pb-10 w-full">
    <legend class="fieldset-legend"> Tâches </legend>
    <TaskList {tasks} class="text-sm" />
  </fieldset>
</section>
