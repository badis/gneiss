import { FC, useState } from "react";
import { CommentDialog } from "@/components/features/comment/CommentDialog";
import { ChatBubbleOutlineRoundedIcon } from "@/components/icons";
import { IconButton } from "@/components/presentational";

interface CommentProps {
  post_id: number;
}
export const Comment: FC<CommentProps> = ({ post_id }) => {
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
        post_id={post_id}
      />
    </>
  );
};
