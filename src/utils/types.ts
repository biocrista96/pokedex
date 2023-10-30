export interface Pokemon {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: GameIndice[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Moves[];
  name: string;
  order: number;
  past_abilities: [];
  past_types: [];
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female?: string;
    back_shiny: string;
    back_shiny_female?: string;
    front_default: string;
    front_female?: string;
    front_shiny: string;
    front_shiny_female?: string;
    other: OtherSprites;
    versions: any[];
  };
  stats: Stat[];
  types: PokemonType[];
  weight: number;
}

interface Ability {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

interface Form {
  name: string;
  url: string;
}

interface GameIndice {
  game_index: number;
  version: { name: string; url: string };
}

interface Item {
  name: string;
  url: string;
}

interface ItemVersion {
  rarity: number;
  version: { name: string; url: string };
}
interface HeldItem {
  item: Item;
  version_details: ItemVersion;
}

interface Move {
  name: string;
  url: string;
}

interface VersionGroup {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

interface Moves {
  move: Move;
  version_group_details: VersionGroup;
}

interface OtherSprites {
  dream_world: {
    front_default: string;
    front_female?: string;
  };
  home: {
    front_default: string;
    front_female?: string;
    front_shiny: string;
    front_shiny_female?: string;
  };
  "official-artwork": {
    front_default: string;
    front_shiny: string;
  };
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface pokelistResponseType {
  count: number;
  next: string;
  previous: string;
  results: pokeResponseType[];
}

export interface pokeResponseType {
  name: string;
  url: string;
}

export interface responseByType {
  is_hidden: boolean;
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}
