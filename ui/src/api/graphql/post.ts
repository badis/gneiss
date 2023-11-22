import { gql } from "@apollo/client";
import { COMMENT_FIELDS, TComment } from "./comment";
import { TLike } from "./like";

export interface TPost {
  id: number;
  message: string;
  created_at: string;
  updated_at: string;
  likes: Array<TLike>;
  comments: Array<TComment>;
  origin: "profile" | "wall" | "space";
  user_id: number;
  user: {
    profiles: Array<{ firstname: string; lastname: string; username: string }>;
  };
}

export const POST_FIELDS = gql`
  ${COMMENT_FIELDS}
  fragment PostFields on post {
    id
    message
    created_at
    updated_at
    user_id
    likes {
      id
      post_id
      user_id
    }
    comments(order_by: { created_at: asc }) {
      id
      ...CommentFields
    }
    user {
      profiles {
        firstname
        lastname
        username
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  ${POST_FIELDS}
  query GetAllPosts {
    posts: post(order_by: { created_at: desc }) {
      id
      ...PostFields
    }
  }
`;

export const GET_POSTS_BY_USER = gql`
  ${POST_FIELDS}
  query GetPostsByUser($username: String!) {
    posts: post(
      where: { user: { username: { _eq: $username } } }
      order_by: { created_at: desc }
    ) {
      id
      ...PostFields
    }
  }
`;

export const GET_POST_BY_ID = gql`
  ${POST_FIELDS}
  query GetPostById($id: Int!) {
    post: post_by_pk(id: $id) {
      id
      ...PostFields
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($message: String!) {
    insert_post_one(object: { message: $message }) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: Int!, $message: String!) {
    update_post_by_pk(pk_columns: { id: $id }, _set: { message: $message }) {
      id
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
