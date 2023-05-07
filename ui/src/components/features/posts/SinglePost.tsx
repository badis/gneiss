import { Post } from "@/api/graphql/post";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
} from "@/components/presentational";
import { timeAgo } from "@/utils/datetime";
import { FC } from "react";

interface SinglePostProps {
  post: Post;
}
export const SinglePost: FC<SinglePostProps> = ({ post }) => {
  return (
    <Card>
      <CardContent>
        <Box>{timeAgo(post.created_at)}</Box>
        <Divider />
        <Box>{post.message}</Box>
      </CardContent>
      <CardActions>
        <br />
      </CardActions>
    </Card>
  );
};
