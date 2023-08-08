import { env } from "@/env.mjs";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: env.POKE_API_URL,
    cache: new InMemoryCache(),
});
