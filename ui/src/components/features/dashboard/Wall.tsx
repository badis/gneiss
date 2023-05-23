import { GET_POSTS, TPost } from "@/api/graphql/post";
import { useQuery } from "@apollo/client";
import { FC } from "react";
import { PostCard, PostCreateForm } from "../post";
import { Container, Skeleton } from "@/components/presentational";

interface WallProps {}
const Wall: FC<WallProps> = () => {
  const { data, loading: loadingPosts } = useQuery(GET_POSTS);

  if (data && !loadingPosts) {
    return (
      <Container>
        <PostCreateForm />
        {data.posts.map((p: TPost, index: number) => (
          <PostCard key={index} post={p} />
        ))}
      </Container>
    );
  }
  return (
    <Container>
      <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />;
    </Container>
  );
};

export { Wall };
