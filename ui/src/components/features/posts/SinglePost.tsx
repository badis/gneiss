import { Post } from "@/api/graphql/post";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
} from "@/components/presentational";
import { FC } from "react";

interface SinglePostProps {
  post: Post;
}
export const SinglePost: FC<SinglePostProps> = ({ post }) => {
  return (
    <Card>
      <CardContent>
        <br />
        <Divider />
        <Box>{post.message}</Box>
      </CardContent>
      <CardActions>
        <br />
      </CardActions>
    </Card>
  );
};
