/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query getPokemon($where: pokemon_v2_pokemon_bool_exp) {\n        pokemon_v2_pokemon(where: $where) {\n            name\n            id\n            pokemon_v2_pokemontypes_aggregate {\n                nodes {\n                    slot\n                    type_id\n                    pokemon_v2_type {\n                        pokemon_v2_typenames {\n                            name\n                        }\n                    }\n                }\n            }\n            pokemon_v2_pokemonsprites {\n                sprites\n            }\n        }\n    }\n": types.GetPokemonDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getPokemon($where: pokemon_v2_pokemon_bool_exp) {\n        pokemon_v2_pokemon(where: $where) {\n            name\n            id\n            pokemon_v2_pokemontypes_aggregate {\n                nodes {\n                    slot\n                    type_id\n                    pokemon_v2_type {\n                        pokemon_v2_typenames {\n                            name\n                        }\n                    }\n                }\n            }\n            pokemon_v2_pokemonsprites {\n                sprites\n            }\n        }\n    }\n"): (typeof documents)["\n    query getPokemon($where: pokemon_v2_pokemon_bool_exp) {\n        pokemon_v2_pokemon(where: $where) {\n            name\n            id\n            pokemon_v2_pokemontypes_aggregate {\n                nodes {\n                    slot\n                    type_id\n                    pokemon_v2_type {\n                        pokemon_v2_typenames {\n                            name\n                        }\n                    }\n                }\n            }\n            pokemon_v2_pokemonsprites {\n                sprites\n            }\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;