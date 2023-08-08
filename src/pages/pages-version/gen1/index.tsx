import { Button } from "@/app/_components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { Suspense } from "react";
import Image from "next/image";
import {
    GetPokemonQuery,
    GetPokemonQueryVariables,
} from "@/__generated__/graphql";
import { client } from "@/lib/pages-client";
import { gql } from "@/__generated__";

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

export default async function Gen1Page() {
    let currentPokedexNumber = Math.floor(Math.random() * 151 + 1);

    const variables: GetPokemonQueryVariables = {
        where: {
            id: {
                _eq: currentPokedexNumber,
            },
        },
    };

    let pokemonQuery = undefined;

    if (!pokemonQuery) {
        const { data } = await client.query({
            query: GET_POKEMON,
            variables,
        });
        if (data) {
            pokemonQuery = data;
        }
        if (!pokemonQuery) return <div>loading...</div>;
    }

    const { pokemon_v2_pokemon: pokemonArray } = pokemonQuery;
    const pokemon = pokemonArray[0];

    if (!pokemon) return <div>loading...</div>;
    if (!pokemon.pokemon_v2_pokemonsprites[0]) return <div>loading...</div>;

    const pokemonSprite = JSON.parse(
        pokemon.pokemon_v2_pokemonsprites[0].sprites
    ).front_default.replace("media", "master");

    async function aTestAction(formData: FormData) {
        const types =
            pokemonQuery!.pokemon_v2_pokemon[0]!.pokemon_v2_pokemontypes_aggregate.nodes.map(
                (node) => {
                    return node
                        .pokemon_v2_type!.pokemon_v2_typenames.map(
                            (typeName) => {
                                return typeName.name;
                            }
                        )
                        .join();
                }
            ).join();

        console.log("Types", types);
        const chosenType = formData.get("typeSelect")!.toString();
        console.log("chosenType", chosenType);
        if (!types.includes(chosenType)) {
            //cookies().set("isWrong", "true");
            //cookies().set("currentPokemon", currentPokedexNumber.toString());
        }

        //cookies().delete("isWrong");
        //cookies().delete("currentPokemon");
    }
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-24">
            <h1 className="text-6xl font-bold text-center">Gen 1</h1>
            {
                //isWrong && <p className="text-red-500">Wrong Type!</p>
            }
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Suspense fallback="Loading">
                            {pokemon.name.charAt(0).toUpperCase() +
                                pokemon.name.substring(1)}
                        </Suspense>
                    </CardTitle>
                    <CardDescription>Which type is it?</CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense
                        fallback={
                            <div className="h-24 w-24 rounded bg-slate-500" />
                        }
                    >
                        <Image
                            src={`${imageUrl}${pokemonSprite}`}
                            alt={pokemon.name}
                            className="h-24 w-24"
                            width={96}
                            height={96}
                        />
                    </Suspense>
                    <form
                        action={aTestAction}
                        className="flex flex-col space-y-2"
                    >
                        <select
                            name="typeSelect"
                            className="rounded text-black p-1"
                        >
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
                            value={currentPokedexNumber}
                        />
                        <Button variant={"outline"}>Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
