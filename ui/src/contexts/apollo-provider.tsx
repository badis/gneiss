import { PropsWithChildren, useMemo } from "react";
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
      operation.setContext(({ headers = {} }) => {
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
  }, [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
