import { gql } from "@apollo/client";

import { COMMENT_FIELDS, CommentInterface } from "./comment";
import { LikeInterface } from "./like";

export enum PostOriginEnum {
  Profile = "Profile",
  Space = "Space",
  Wall = "Wall",
}

export enum PostRefetchQueries {
  GetPostById = "GetPostById",
  GetAllPosts = "GetAllPosts",
  GetPostsByUser = "GetPostsByUser",
  GetPostsByUserWithoutSpaces = "GetPostsByUserWithoutSpaces",
  GetPostsBySpace = "GetPostsBySpace",
}

export interface PostInterface {
  id: number;
  user_id: number;
  space_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  likes: Array<LikeInterface>;
  comments: Array<CommentInterface>;
  user: {
    profiles: Array<{ firstname: string; lastname: string; username: string }>;
  };
  origin: PostOriginEnum;
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

// Posts displayed in Profile
export const GET_POSTS_BY_USER_WITHOUT_SPACES = gql`
  ${POST_FIELDS}
  query GetPostsByUserWithoutSpaces($username: String!) {
    posts: post(
      where: {
        user: { username: { _eq: $username } }
        space_id: { _is_null: true }
      }
      order_by: { created_at: desc }
    ) {
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

export const GET_POSTS_BY_SPACE = gql`
  ${POST_FIELDS}
  query GetPostsBySpace($space_id: Int!) {
    posts: post(
      where: { space_id: { _eq: $space_id } }
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

export const INSERT_POST = gql`
  mutation InsertPost($message: String!, $space_id: Int) {
    insert_post_one(object: { message: $message, space_id: $space_id }) {
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
