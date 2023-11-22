import { FC, useState } from "react";
import { TPost } from "@/api/graphql/post";
import { DeletePostDialog } from "@/components/core/post/DeletePostDialog";
import { EditPostDialog } from "@/components/core/post/EditPostDialog";
import { DeleteIcon, EditIcon, MoreVertIcon } from "@/components/icons";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@/components/presentational";
import { useSession } from "@/hooks/use-session";

interface PostMenuProps {
  post: TPost;
}
export const PostMenu: FC<PostMenuProps> = ({ post }) => {
  const {
    session: { currentUser },
  } = useSession();

  const [openEditPostModal, setOpenEditPostModal] = useState(false);
  const [openDeletePostDialog, setOpenDeletePostDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  if (currentUser.id !== post.user_id) return <></>;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditPostClick = () => {
    setOpenEditPostModal(true);
    setAnchorEl(null);
  };

  const handleDeletePostClick = () => {
    setOpenDeletePostDialog(true);
    setAnchorEl(null);
  };

  const handleCloseEditPostModal = () => {
    setOpenEditPostModal(false);
  };

  const handleCloseDeletePostDialog = () => {
    setOpenDeletePostDialog(false);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} onClose={handleClose} open={open}>
        <MenuItem onClick={handleEditPostClick}>
          <ListItemIcon>
            <EditIcon sx={{ fontSize: "16px" }} />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeletePostClick}>
          <ListItemIcon>
            <DeleteIcon sx={{ fontSize: "16px" }} />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <EditPostDialog
        post={post}
        open={openEditPostModal}
        onClose={handleCloseEditPostModal}
      />
      <DeletePostDialog
        post={post}
        open={openDeletePostDialog}
        onClose={handleCloseDeletePostDialog}
      />
    </Box>
  );
};
