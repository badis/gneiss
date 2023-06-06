import { gql } from "@apollo/client";

export interface TProfile {
  user_id: number;
  guid: string;
  username: string;
  firstname: string;
  lastname: string;
  title: string;
  about: string;
  mobile: string;
  country: string;
  gender: boolean;
  birthday: string;
  picture: string;
  banner: string;
}

export const PROFILE_FIELDS = gql`
  fragment ProfileFields on profile {
    guid
    username
    firstname
    lastname
    title
    about
    mobile
    country
    gender
    birthday
    picture
    banner
  }
`;

export const UPDATE_PROFILE = gql`
  ${PROFILE_FIELDS}
  mutation UpdateProfile(
    $user_id: Int!
    $firstname: String
    $lastname: String
    $title: String
    $about: String
    $mobile: String
    $country: String
    $gender: Boolean
    $birthday: date
  ) {
    updated_profile: update_profile_by_pk(
      pk_columns: { user_id: $user_id }
      _set: {
        firstname: $firstname
        lastname: $lastname
        title: $title
        about: $about
        mobile: $mobile
        country: $country
        gender: $gender
        birthday: $birthday
      }
    ) {
      user_id
      ...ProfileFields
    }
  }
`;

export const GET_PROFILE_BY_ID = gql`
  ${PROFILE_FIELDS}
  query GetProfileById($user_id: Int!) {
    profile: profile_by_pk(user_id: $user_id) {
      user_id
      ...ProfileFields
    }
  }
`;

export const GET_PROFILE_BY_USERNAME = gql`
  ${PROFILE_FIELDS}
  query GetProfileByUsername($username: String!) {
    profiles: profile(where: { username: { _eq: $username } }) {
      user_id
      ...ProfileFields
    }
  }
`;
