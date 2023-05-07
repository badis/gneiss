import { Post } from "@/api/graphql/post";
import { MoreVertIcon } from "@/components/icons";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
} from "@/components/presentational";
import { timeAgo } from "@/utils/datetime";
import { FC } from "react";
import { PostMenu } from "./PostMenu";

interface PostCardProps {
  post: Post;
}
export const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Card>
      <CardHeader
        action={<PostMenu />}
        subheader={
          <Box component="span" sx={{ fontSize: "12px" }}>
            {timeAgo(post.created_at)}
          </Box>
        }
      />
      <CardContent>
        <Divider />
        <Box>{post.message}</Box>
      </CardContent>
      <CardActions>
        <br />
      </CardActions>
    </Card>
  );
};
