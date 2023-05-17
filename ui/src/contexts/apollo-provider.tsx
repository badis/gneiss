import { PropsWithChildren, useEffect, useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { useLocalStorage } from "@/hooks/use-local-storage";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_API_URL,
});

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const [accessToken] = useLocalStorage("accessToken");
  const [refreshToken] = useLocalStorage("refreshToken");
  const [refresh] = useLocalStorage("refresh");
  let token = accessToken;
  if (refresh) {
    token = refreshToken;
  }

  const client = useMemo(() => {
    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      }));

      return forward(operation);
    });

    return new ApolloClient({
      link: from([authMiddleware, httpLink]),
      cache: new InMemoryCache(),
    });
  }, [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
