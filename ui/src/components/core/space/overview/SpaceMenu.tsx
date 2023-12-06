import { FC, useState } from "react";

import { SpaceInterface } from "@/api/graphql/space";
import { DeleteIcon, EditIcon, MoreVertIcon } from "@/components/icons";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@/components/presentational";

import { DeleteSpaceDialog, EditSpaceDialog } from ".";

interface SpaceMenuProps {
  space: SpaceInterface;
}
export const SpaceMenu: FC<SpaceMenuProps> = ({ space }) => {

  const [openEditSpaceModal, setOpenEditSpaceModal] = useState(false);
  const [openDeleteSpaceDialog, setOpenDeleteSpaceDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditSpaceClick = () => {
    setOpenEditSpaceModal(true);
    setAnchorEl(null);
  };

  const handleDeleteSpaceClick = () => {
    setOpenDeleteSpaceDialog(true);
    setAnchorEl(null);
  };

  const handleCloseEditSpaceModal = () => {
    setOpenEditSpaceModal(false);
  };

  const handleCloseDeleteSpaceDialog = () => {
    setOpenDeleteSpaceDialog(false);
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} onClose={handleClose} open={open}>
        <MenuItem onClick={handleEditSpaceClick}>
          <ListItemIcon>
            <EditIcon sx={{ fontSize: "16px" }} />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDeleteSpaceClick}>
          <ListItemIcon>
            <DeleteIcon sx={{ fontSize: "16px" }} />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <EditSpaceDialog
        space={space}
        open={openEditSpaceModal}
        onClose={handleCloseEditSpaceModal}
      />
      <DeleteSpaceDialog
        space={space}
        open={openDeleteSpaceDialog}
        onClose={handleCloseDeleteSpaceDialog}
      />
    </Box>
  );
};
