import { Post } from "@/api/graphql/post";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@/components/presentational";
import { timeAgo } from "@/utils/datetime";
import { FC } from "react";
import { Like } from "@/components/features/like/Like";
import { PostMenu } from "./PostMenu";
interface PostCardProps {
  post: Post;
}
export const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Card>
      <CardHeader
        action={<PostMenu post={post} />}
        subheader={
          <Box>
            <Box component="span" sx={{ fontSize: "12px" }}>
              {timeAgo(post.created_at)}
            </Box>
            <Box component="span" sx={{ fontSize: "12px" }}>
              {post.created_at !== post.updated_at ? " (edited)" : null}
            </Box>
          </Box>
        }
      />
      <CardContent>
        <Divider />
        <Box>{post.message}</Box>
      </CardContent>
      <CardActions>
        <Like
          post_id={post.id}
          like_id={post.likes.length > 0 ? post.likes[0].id : undefined}
        />
      </CardActions>
    </Card>
  );
};
