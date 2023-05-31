import Link from "next/link";
import { FC } from "react";
import { useTheme } from "@mui/material";

import { TPost } from "@/api/graphql/post";
import { Comment } from "@/components/features/comment";
import { Like } from "@/components/features/like";
import { PostMenu } from "@/components/features/post";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@/components/presentational";
import { timeAgo } from "@/utils/datetime";
import { useSession } from "@/hooks/use-session";

interface PostCardProps {
  post: TPost;
}
export const PostCard: FC<PostCardProps> = ({ post }) => {
  const {
    session: { currentUser },
  } = useSession();

  const theme = useTheme();

  const myLike = post.likes.find((l) => l.user_id == currentUser.id);
  const liked = !!myLike;

  const { firstname, lastname, username } = post.user.profiles[0];
  const fullname = firstname + " " + lastname;

  return (
    <Card>
      <CardHeader
        action={<PostMenu post={post} />}
        subheader={
          <Box>
            <Link href={"/" + username}>
              <Typography variant="subtitle1" color={theme.palette.grey[900]}>
                {fullname}
              </Typography>
            </Link>
            <Box>
              <Box component="span" sx={{ fontSize: "12px" }}>
                {timeAgo(post.created_at)}
              </Box>
              <Box component="span" sx={{ fontSize: "12px" }}>
                {post.created_at !== post.updated_at ? " (edited)" : null}
              </Box>
            </Box>
          </Box>
        }
      />
      <CardContent>
        <Divider />
        <Box>{post.message}</Box>
      </CardContent>
      <CardActions>
        <Like post={post} liked={liked} like_id={myLike?.id} />
        <Comment post={post} />
      </CardActions>
    </Card>
  );
};
