"use server";
import { gql } from "@/__generated__/gql";
import type {
    GetPokemonQuery,
    GetPokemonQueryVariables,
} from "@/__generated__/graphql";
import { getClient, redis } from "@/lib/client";
import { revalidatePath } from "next/cache";

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

export async function aTestAction(formData: FormData) {
    const pokedexNumber = parseInt(
        formData.get("pokedexNumber")?.toString() || ""
    );
    const variables: GetPokemonQueryVariables = {
        where: {
            id: {
                _eq: pokedexNumber,
            },
        },
    };

    let getPokemonQuery = (await redis.get(
        `pokemon-types-cache-${pokedexNumber}}`
    )) as GetPokemonQuery;

    if (!getPokemonQuery) {
        const { data } = await getClient().query({
            query: GET_POKEMON,
            variables,
        });
        if (data) {
            getPokemonQuery = data;
        }
        await redis.set(
            `pokemon-types-cache-${pokedexNumber}}`,
            getPokemonQuery,
            {
                ex: 60,
            }
        );
    }

    const types =
        getPokemonQuery.pokemon_v2_pokemon[0]!.pokemon_v2_pokemontypes_aggregate.nodes.map(
            (node) => {
                return node
                    .pokemon_v2_type!.pokemon_v2_typenames.map((typeName) => {
                        return typeName.name;
                    })
                    .join();
            }
        ).join();

    console.log("Types", types);
    const chosenType = formData.get("typeSelect")!.toString();
    console.log("chosenType", chosenType);
    if (!types.includes(chosenType)) {
        //throw new Error("Invalid type");
    } else {
        revalidatePath("/gen1");
    }
}
