import { GET_POSTS, TPost } from "@/api/graphql/post";
import { useQuery } from "@apollo/client";
import { FC } from "react";
import { PostCard, PostCreateForm } from "../post";
import { Skeleton } from "@/components/presentational";

interface WallProps {}
const Wall: FC<WallProps> = () => {
  const { data, loading: loadingPosts } = useQuery(GET_POSTS);

  if (data && !loadingPosts) {
    return (
      <>
        <PostCreateForm />
        {data.posts.map((p: TPost, index: number) => (
          <PostCard key={index} post={p} />
        ))}
      </>
    );
  }
  return <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />;
};

export { Wall };
