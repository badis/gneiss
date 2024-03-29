import { gql } from "@apollo/client";

export interface SignupInput {
  username: string;
  email: string;
  password: string;
}

export interface SignupOutput {
  accessToken: string;
  refreshToken: string;
  response: RestApiResponse;
}

export interface SigninInput {
  username: string;
  password: string;
}

export interface SigninOutput {
  accessToken: string;
  refreshToken: string;
  response: RestApiResponse;
}

export interface RequestPasswordOutput {
  response: RestApiResponse;
}

export interface CurrentUser {
  id: number;
  username: string;
}

export interface RestApiResponse {
  error: string;
  message: string[];
  statusCode: number;
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
        message
        statusCode
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
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
        message
        statusCode
      }
    }
  }
`;

export const REQUEST_PASSWORD = gql`
  mutation RequestPassword($email: String!) {
    requestPassword(email: $email) {
      response {
        error
        message
        statusCode
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      response {
        error
        message
        statusCode
      }
    }
  }
`;
