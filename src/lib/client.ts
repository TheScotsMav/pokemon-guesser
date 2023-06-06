import { env } from "@/env.mjs";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

import { Redis } from "@upstash/redis";

export const redis = new Redis({
    url: env.REDIS_URL,
    token: env.REDIS_TOKEN,
});

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "no-cache",
            },
        },
        link: new HttpLink({
            uri: env.POKE_API_URL,
        }),
    });
});
