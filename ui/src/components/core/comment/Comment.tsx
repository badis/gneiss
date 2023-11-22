import { FC, useState } from "react";

import { CommentDialog } from "@/components/core/comment";
import { ChatBubbleOutlineRoundedIcon } from "@/components/icons";
import { IconButton } from "@/components/presentational";
import { TPost } from "@/api/graphql/post";

interface CommentProps {
  post: TPost;
}
export const Comment: FC<CommentProps> = ({ post }) => {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  const handleOpenCommentDialog = () => {
    setOpenCommentDialog(true);
  };

  const handleCloseCommentDialog = () => {
    setOpenCommentDialog(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenCommentDialog}>
        <ChatBubbleOutlineRoundedIcon fontSize="small" />
      </IconButton>
      <CommentDialog
        open={openCommentDialog}
        onClose={handleCloseCommentDialog}
        post_id={post.id}
      />
    </>
  );
};
