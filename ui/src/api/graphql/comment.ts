import { gql } from "@apollo/client";

export interface CommentInterface {
  id: number;
  post_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  user: {
    profiles: Array<{
      firstname: string;
      lastname: string;
      username: string;
    }>;
  };
}

export const COMMENT_FIELDS = gql`
  fragment CommentFields on comment {
    post_id
    message
    created_at
    updated_at
    user_id
    user {
      profiles {
        firstname
        lastname
        username
      }
    }
  }
`;

export const INSERT_COMMENT = gql`
  ${COMMENT_FIELDS}
  mutation InsertComment($post_id: Int!, $message: String!) {
    insert_comment_one(object: { post_id: $post_id, message: $message }) {
      id
      ...CommentFields
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
