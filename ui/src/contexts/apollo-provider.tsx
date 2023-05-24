import { PropsWithChildren, useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { useRouter } from "next/router";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_API_URL,
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const client = useMemo(() => {
    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => {
        const accessToken = localStorage.getItem("accessToken") || null;
        const refreshToken = localStorage.getItem("refreshToken") || null;
        const refresh = localStorage.getItem("refresh") || null;

        let token = "";

        if (!refresh && accessToken) {
          token = JSON.parse(accessToken);
          return {
            headers: {
              ...headers,
              Authorization: `Bearer ${token}`,
              "x-hasura-role": "frontend_user",
            },
          };
        }

        if (refresh && refreshToken) {
          token = refreshToken ? JSON.parse(refreshToken) : refreshToken;
          return {
            headers: {
              ...headers,
              Refresh: `Bearer ${token}`,
            },
          };
        }

        return {
          headers,
        };
      });

      return forward(operation).map((data) => {
        if (data && data.errors) {
          console.error(data.errors);
        }
        return data;
      });
    });

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
