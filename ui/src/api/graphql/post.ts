import { gql } from "@apollo/client";

export interface Post {
  id: number;
  message: string;
  created_at: string;
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

export const CREATE_POST = gql`
  mutation CreatePost($message: String!) {
    insert_post_one(object: { message: $message }) {
      id
      message
      created_at
    }
  }
`;
