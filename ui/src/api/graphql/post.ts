import { gql } from "@apollo/client";
import { TComment } from "./comment";
import { TLike } from "./like";

export interface TPost {
  id: number;
  message: string;
  created_at: string;
  updated_at: string;
  likes: Array<TLike>;
  comments: Array<TComment>;
}

export const GET_POSTS = gql`
  query GetPosts {
    posts: post(order_by: { created_at: desc }, limit: 5, offset: 0) {
      id
      message
      created_at
      updated_at
      likes {
        id
        post_id
        user_id
      }
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($id: Int!) {
    post: post_by_pk(id: $id) {
      id
      message
      created_at
      updated_at
      likes {
        id
        post_id
        user_id
      }
      comments(order_by: { created_at: asc }) {
        id
        post_id
        user_id
        message
        created_at
        updated_at
      }
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

export const UPDATE_POST = gql`
  mutation UpdatePost($id: Int!, $message: String!) {
    update_post_by_pk(pk_columns: { id: $id }, _set: { message: $message }) {
      id
      message
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    delete_post_by_pk(id: $id) {
      id
    }
  }
`;
