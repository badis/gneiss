import { DeleteIcon, EditIcon, MoreVertIcon } from "@/components/icons";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@/components/presentational";
import { FC, useState } from "react";
import { DeletePostDialog } from "./DeletePostDialog";
import { EditPostDialog } from "./EditPostDialog";
import { Post } from "@/api/graphql/post";

interface PostMenuProps {
  post: Post;
}
export const PostMenu: FC<PostMenuProps> = ({ post }) => {
  const [openEditPostModal, setOpenEditPostModal] = useState(false);
  const [openDeletePostDialog, setOpenDeletePostDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

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
      <IconButton onClick={handleClick} disableRipple>
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
        id={post.id}
        open={openDeletePostDialog}
        onClose={handleCloseDeletePostDialog}
      />
    </Box>
  );
};
