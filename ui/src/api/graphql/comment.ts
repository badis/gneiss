import { gql } from "@apollo/client";

export interface TComment {
  id: number;
  post_id: number;
  message: string;
  created_at: string;
  updated_at: string;
}

export const CREATE_COMMENT = gql`
  mutation CreateComment($post_id: Int!, $message: String!) {
    insert_comment_one(object: { post_id: $post_id, message: $message }) {
      id
      post_id
      message
      created_at
      updated_at
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: Int!) {
    delete_comment_by_pk(id: $id) {
      id
    }
  }
`;
