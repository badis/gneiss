import { useRouter } from "next/router";
import { useLocalStorage } from "./use-local-storage";
import { useEffect, useState } from "react";
import { GET_CURRENT_USER, REFRESH_TOKEN, SIGNOUT } from "@/api/graphql/auth";
import { useLazyQuery, useQuery } from "@apollo/client";

import { useApolloClient } from "@apollo/client";

export interface CurrentUser {
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

  const isAuthenticated = !!currentUser?.username && !!accessToken;

  const router = useRouter();
  const client = useApolloClient();

  const {
    data: currentUserData,
    loading: fetchingCurrentUser,
    error: fetchingCurrentUserError,
  } = useQuery(GET_CURRENT_USER);

  const [
    refreshAccessToken,
    {
      data: newAccessTokenData,
      loading: refreshingAccessToken,
      error: refreshingAccessTokenError,
    },
  ] = useLazyQuery(REFRESH_TOKEN);

  const [signoutOnServer] = useLazyQuery(SIGNOUT);

  useEffect(() => {
    if (fetchingCurrentUserError && !refresh) {
      removeAccessToken();
      router.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchingCurrentUserError]);

  useEffect(() => {
    if (currentUserData && !refresh) {
      if (currentUserData?.currentUser.username) {
        const { id, username } = currentUserData.currentUser;
        setCurrentUser({ id, username });
        setLoading(false);
      }

      if (currentUserData?.currentUser.response) {
        removeAccessToken();
        if (refreshToken) {
          setRefresh(true);
        } else {
          // signout();
          setLoading(false);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserData]);

  useEffect(() => {
    if (refresh && refreshingAccessTokenError) {
      // signout();
      // setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshingAccessTokenError]);

  useEffect(() => {
    if (refresh) {
      refreshAccessToken();
      if (newAccessTokenData) {
        if (newAccessTokenData?.refresh?.accessToken) {
          setAccessToken(newAccessTokenData.refresh.accessToken);
          setRefreshToken(newAccessTokenData.refresh.refreshToken);
          removeRefresh();
          router.reload();
        } else {
          signout();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, newAccessTokenData]);

  const clearLocalStorage = () => {
    removeAccessToken();
    removeRefreshToken();
    removeCurrentUser();
    removeRefresh();
  };

  const signout = async () => {
    if (isAuthenticated) {
      try {
        await signoutOnServer();
      } catch (e) {
        console.error("Error occured: unable to sign out on server", e);
      }
    }

    try {
      await client.clearStore();
      clearLocalStorage();
      router.push("/auth/signin");
    } catch (e) {
      console.error("Error occured: unable to sign out on client", e);
    }
  };

  return {
    session: {
      isAuthenticated,
      loading,
      accessToken,
      refreshToken,
      currentUser,
      signout,
    } as Session,
  };
}
