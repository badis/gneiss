import { FC, useState } from "react";
import { CommentInterface } from "@/api/graphql/comment";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@/components/presentational";
import { DeleteIcon, MoreVertIcon } from "@/components/icons";
import { DeleteCommentDialog } from "@/components/core/comment/DeleteCommentDialog";
import { useSession } from "@/hooks/use-session";

interface CommentMenuProps {
  comment: CommentInterface;
}
export const CommentMenu: FC<CommentMenuProps> = ({ comment }) => {
  const {
    session: { currentUser },
  } = useSession();

  const [openDeletePostDialog, setOpenDeletePostDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  if (currentUser.id !== comment.user_id) return <></>;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePostClick = () => {
    setOpenDeletePostDialog(true);
    setAnchorEl(null);
  };

  const handleCloseDeletePostDialog = () => {
    setOpenDeletePostDialog(false);
  };

  return (
    <Box sx={{ position: "relative", top: "-5px" }}>
      <IconButton onClick={handleClick}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchorEl} onClose={handleClose} open={open}>
        <MenuItem onClick={handleDeletePostClick}>
          <ListItemIcon>
            <DeleteIcon sx={{ fontSize: "16px" }} />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <DeleteCommentDialog
        id={comment.id}
        open={openDeletePostDialog}
        onClose={handleCloseDeletePostDialog}
      />
    </Box>
  );
};
