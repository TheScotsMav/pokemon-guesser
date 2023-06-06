import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        POKE_API_URL: z.string().url(),
        REDIS_URL: z.string().url(),
        REDIS_TOKEN: z.string(),
    },
    client: {
    },
    runtimeEnv: {
        POKE_API_URL: process.env.POKE_API_URL,
        REDIS_URL: process.env.REDIS_URL,
        REDIS_TOKEN: process.env.REDIS_TOKEN,
    },
});