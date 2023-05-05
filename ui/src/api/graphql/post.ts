import { gql } from "@apollo/client";

export interface Post {
  id: number;
  message: string;
  created_at: number;
}

export const GET_POSTS = gql`
  query GetPosts {
    posts: post {
      id
      message
      created_at
    }
  }
`;
