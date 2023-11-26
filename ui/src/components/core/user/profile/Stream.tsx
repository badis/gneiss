import { useQuery } from "@apollo/client";
import { FC } from "react";

import {
  GET_POSTS_BY_USER,
  GET_POSTS_BY_USER_WITHOUT_SPACES,
  PostInterface,
  PostOriginEnum,
} from "@/api/graphql/post";
import { PostCard, PostCreateForm } from "@/components/core/post";
import { Container, Skeleton } from "@/components/presentational";
import { useSession } from "@/hooks/use-session";

interface StreamProps {
  username: string;
}
const Stream: FC<StreamProps> = ({ username }) => {
  const {
    session: { currentUser },
  } = useSession();

  const { data, loading: loadingPosts } = useQuery(
    GET_POSTS_BY_USER_WITHOUT_SPACES,
    {
      variables: {
        username,
      },
    }
  );

  if (data && !loadingPosts) {
    return (
      <Container>
        {currentUser.username == username && <PostCreateForm />}
        {data.posts.map((post: PostInterface, index: number) => {
          return (
            <PostCard
              key={index}
              post={{ ...post, origin: PostOriginEnum.Profile }}
            />
          );
        })}
      </Container>
    );
  }
  return (
    <Container>
      <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />
    </Container>
  );
};

export { Stream };
