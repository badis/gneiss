import { FC } from "react";
import { Post } from "@/api/graphql/post";
import { Comment } from "@/components/features/comment/Comment";
import { Like } from "@/components/features/like/Like";
import { PostMenu } from "@/components/features/post/PostMenu";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@/components/presentational";
import { timeAgo } from "@/utils/datetime";

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
        <Comment post_id={post.id} />
      </CardActions>
    </Card>
  );
};
