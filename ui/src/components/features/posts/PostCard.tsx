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

interface PostCardProps {
  post: Post;
}
export const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Card>
      <CardContent>
        <Box component="span" sx={{ fontSize: "10px" }}>
          {timeAgo(post.created_at)}
        </Box>
        <Divider />
        <Box>{post.message}</Box>
      </CardContent>
      <CardActions>
        <br />
      </CardActions>
    </Card>
  );
};
