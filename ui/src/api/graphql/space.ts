import { gql } from "@apollo/client";

export interface SpaceInterface {
  id: number;
  name: string;
  memberships: Array<{ user: { id: number; username: string } }>;
  description: string;
  banner?: string;
  picture?: string;
  created_at: string;
  updated_at: string;
}

export const SPACE_FIELDS = gql`
  fragment SpaceFields on space {
    id
    name
    description
    created_at
    updated_at
  }
`;

export const GET_ALL_SPACES = gql`
  ${SPACE_FIELDS}
  query GetAllSpaces {
    spaces: space(order_by: { created_at: desc }) {
      id
      ...SpaceFields
    }
  }
`;

export const GET_SPACE_BY_ID = gql`
  ${SPACE_FIELDS}
  query GetSpaceById($id: Int!) {
    space: space_by_pk(id: $id) {
      id
      memberships {
        user {
          id
          username
        }
      }
      ...SpaceFields
    }
  }
`;
