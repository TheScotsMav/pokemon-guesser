import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/pages-client";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
