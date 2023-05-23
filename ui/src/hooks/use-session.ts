import { useRouter } from "next/router";
import { useLocalStorage } from "./use-local-storage";
import { useEffect, useState } from "react";
import { GET_CURRENT_USER, REFRESH_TOKEN, SIGNOUT } from "@/api/graphql/auth";
import { useLazyQuery, useQuery } from "@apollo/client";

import { useApolloClient } from "@apollo/client";

export interface CurrentUser {
  // TODO: add more fields for current user
  id: number;
  username: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  currentUser: CurrentUser;
  isAuthenticated: boolean;
  loading: boolean;
  signout: () => Promise<any>;
}

export function useSession() {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken, removeAccessToken] =
    useLocalStorage("accessToken");
  const [refreshToken, setRefreshToken, removeRefreshToken] =
    useLocalStorage("refreshToken");
  const [refresh, setRefresh, removeRefresh] = useLocalStorage("refresh");
  const [currentUser, setCurrentUser, removeCurrentUser] =
    useLocalStorage("user");

  const router = useRouter();
  const client = useApolloClient();

  const { data: currentUserData, loading: loadingCurrentUserData } =
    useQuery(GET_CURRENT_USER);

  const [getNewRefreshToken, { loading: refreshing, data: refreshTokenData }] =
    useLazyQuery(REFRESH_TOKEN);

  const [signoutOnServer, { loading: signingout, data: signoutResponse }] =
    useLazyQuery(SIGNOUT);

  useEffect(() => {
    if (refresh) {
      getNewRefreshToken();
      setLoading(false);
      if (refreshTokenData?.refresh?.accessToken) {
        setAccessToken(refreshTokenData.refresh.accessToken);
        setRefreshToken(refreshTokenData.refresh.refreshToken);
        removeRefresh();
      } else {
        if (refreshTokenData?.refresh?.response) {
          const { statusCode } = refreshTokenData?.refresh?.response;
          switch (statusCode) {
            case 401: // Unauthorized
              signout();
              break;
            case 403: // Forbidden
              // console.log(statusCode);
              break;
            default:
              break;
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, refreshing, refreshTokenData]);

  useEffect(() => {
    if (!refresh) {
      if (!loadingCurrentUserData && currentUserData) {
        setLoading(false);
        if (currentUserData.currentUser?.username) {
          const { id, username } = currentUserData.currentUser;
          setCurrentUser({ id, username });
        } else {
          if (currentUserData.currentUser?.response) {
            const { statusCode } = currentUserData.currentUser?.response;
            switch (statusCode) {
              case 401: // Unauthorized
                if (refreshToken) {
                  setRefresh(true);
                  window.location.reload();
                }
                break;
              default:
                break;
            }
            // window.location.href = "/";
          }
          if (currentUserData.currentUser?.errors) {
            console.log(currentUserData.currentUser?.errors);
          }
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCurrentUserData, currentUserData]);

  const clearLocalStorage = () => {
    removeAccessToken();
    removeRefreshToken();
    removeCurrentUser();
    removeRefresh();
  };

  const signout = async () => {
    try {
      await signoutOnServer();
      await client.clearStore();
      clearLocalStorage();
      window.location.href = "/auth/signin";
    } catch (e) {
      console.error("Error occured: unable to sign out", e);
    }
  };

  return {
    session: {
      isAuthenticated: !!currentUser?.username && !!accessToken,
      loading,
      accessToken,
      refreshToken,
      currentUser,
      signout,
    } as Session,
  };
}
