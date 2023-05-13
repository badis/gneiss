import { gql } from "@apollo/client";

export interface TSignup {
  username: string;
  email: string;
  password: string;
}

export const SIGNUP = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      accessToken
      refreshToken
      response {
        error
        message
        statusCode
      }
    }
  }
`;

export interface TSignin {
  username: string;
  password: string;
}

export const SIGNIN = gql`
  mutation Signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      accessToken
      refreshToken
      response {
        error
        message
        statusCode
      }
    }
  }
`;

export const SIGNOUT = gql`
  query Signout {
    signout {
      ok
      response {
        error
        statusCode
        message
      }
    }
  }
`;

export interface CurrentUser {
  username: string;
}

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      username
      response {
        error
        message
        statusCode
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  query RefreshToken {
    refresh {
      accessToken
      refreshToken
      response {
        error
        statusCode
        message
      }
    }
  }
`;
