import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import Image from "next/image";
import { getClient, redis } from "@/lib/client";
import { gql } from "@/__generated__/gql";
import type {
    GetPokemonQuery,
    GetPokemonQueryVariables,
} from "@/__generated__/graphql";
import { Button } from "../_components/ui/button";
import { aTestAction } from "../_actions/aTestAction";

const GET_POKEMON = gql(/* GraphQL */ `
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
`);

const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites";

const pokemonTypes = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
];

const PokemonHolder = ({ pokedexNumber }: { pokedexNumber: number }) => {
    return (
        <form action={aTestAction} className="flex flex-col space-y-2">
            <select name="typeSelect" className="rounded text-black p-1">
                {pokemonTypes.sort().map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <input
                type="hidden"
                id="pokedexNumber"
                name="pokedexNumber"
                value={pokedexNumber}
            />
            <Button variant={"outline"}>Submit</Button>
        </form>
    );
};

//export const runtime = "experimental-edge";

export default async function Gen1Page() {
    const currentPokedexNumber = Math.floor(Math.random() * 151 + 1);

    const variables: GetPokemonQueryVariables = {
        where: {
            id: {
                _eq: currentPokedexNumber,
            },
        },
    };

    let pokemonQuery = (await redis.get(
        `pokemon-types-cache-${currentPokedexNumber}}`
    )) as GetPokemonQuery;

    if (!pokemonQuery) {
        const { data } = await getClient().query({
            query: GET_POKEMON,
            variables,
        });
        if (data) {
            pokemonQuery = data;
        }
        await redis.set(
            `pokemon-types-cache-${currentPokedexNumber}}`,
            pokemonQuery,
            {
                ex: 60,
            }
        );
    }

    const { pokemon_v2_pokemon: pokemonArray } = pokemonQuery;
    const pokemon = pokemonArray[0];

    if (!pokemon) return <div>loading...</div>;
    if (!pokemon.pokemon_v2_pokemonsprites[0]) return <div>loading...</div>;

    const pokemonSprites = JSON.parse(
        pokemon.pokemon_v2_pokemonsprites[0].sprites
    );

    return (
        <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-24">
            <h1 className="text-6xl font-bold text-center">Gen 1</h1>
            <Card>
                <CardHeader>
                    <CardTitle>{pokemon.name}</CardTitle>
                    <CardDescription>What type is it?</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image
                        src={`${imageUrl}${pokemonSprites.front_default.replace(
                            "media",
                            "master"
                        )}`}
                        alt={pokemon.name}
                        className="h-24 w-24"
                        width={96}
                        height={96}
                    />
                    <PokemonHolder pokedexNumber={currentPokedexNumber} />
                </CardContent>
            </Card>
        </main>
    );
}
