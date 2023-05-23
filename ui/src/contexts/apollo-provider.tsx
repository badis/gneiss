import { PropsWithChildren, useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_API_URL,
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const client = useMemo(() => {
    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => {
        const accessToken = localStorage.getItem("accessToken") || null;
        const refreshToken = localStorage.getItem("refreshToken") || null;
        const refresh = localStorage.getItem("refresh") || null;

        let token = accessToken ? JSON.parse(accessToken) : accessToken;
        if (refresh) {
          token = refreshToken ? JSON.parse(refreshToken) : refreshToken;
        }

        if (token) {
          return {
            headers: {
              ...headers,
              Authorization: `Bearer ${token}`,
              "x-hasura-role": "frontend_user",
            },
          };
        } else {
          return {
            headers: {
              ...headers,
              "x-hasura-role": "anonymous",
            },
          };
        }
      });

      return forward(operation);
    });

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
