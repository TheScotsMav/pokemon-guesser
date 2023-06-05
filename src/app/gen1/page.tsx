import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

import Image from "next/image";

import { getClient } from "@/lib/client";

import { gql } from "@apollo/client";
import { Form } from "../_components/ui/form";
import { PokemonHolder } from "./pokemonHolder";

const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites";

type Pokemon = {
  name: string;
  id: number;
  pokemon_v2_pokemontypes_aggregate: {
    nodes: {
      slot: number;
      type_id: number;
      pokemon_v2_type: {
        pokemon_v2_typenames: {
          name: string;
        }[];
      };
    }[];
  };
  pokemon_v2_pokemonsprites: {
    sprites: string;
  }[];
};

const query = gql`
  query getPokemon($where: pokemon_v2_pokemon_bool_exp) {
    pokemon_v2_pokemon(where: $where) {
      name
      id
      pokemon_v2_pokemontypes_aggregate {
        nodes {
          slot
          type_id
          pokemon_v2_type {
            pokemon_v2_typenames {
              name
            }
          }
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

//export const runtime = "experimental-edge";

export default async function Gen1() {
  const currentPokedexNumber = Math.floor(Math.random() * 151 + 1);

  const { data } = await getClient().query({
    query,
    variables: {
      where: {
        id: {
          _eq: currentPokedexNumber,
        },
      },
    },
  });

  const { pokemon_v2_pokemon: pokemon } = data as {
    pokemon_v2_pokemon: Pokemon[];
  };

  const pokemonSprites = JSON.parse(
    pokemon[0].pokemon_v2_pokemonsprites[0].sprites
  );

  return (
    <main className="flex min-h-screen flex-col items-center gap-3 p-24">
      <h1 className="text-6xl font-bold text-center">Gen1</h1>
      <Card>
        <CardHeader>
          <CardTitle>{pokemon[0].name}</CardTitle>
          <CardDescription>What type is it?</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={`${imageUrl}${pokemonSprites.front_default.replace(
              "media",
              "master"
            )}`}
            alt={pokemon[0].name}
            className="h-24 w-24"
            width={96}
            height={96}
          />
          <PokemonHolder />
        </CardContent>
      </Card>
    </main>
  );
}
