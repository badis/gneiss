import { gql } from "@apollo/client";

export interface TLike {
  id: number;
  post_id: number;
  user_id: number;
}

export const CREATE_LIKE = gql`
  mutation CreateLike($post_id: Int!) {
    insert_like_one(object: { post_id: $post_id }) {
      id
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation DeleteLike($id: Int!) {
    delete_like_by_pk(id: $id) {
      id
    }
  }
`;
