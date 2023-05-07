import { DeleteIcon, EditIcon, MoreVertIcon } from "@/components/icons";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@/components/presentational";
import { FC, useState } from "react";

interface PostMenuProps {}
export const PostMenu: FC<PostMenuProps> = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleClick} disableRipple>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} onClose={handleClose} open={open}>
        <MenuItem>
          <ListItemIcon>
            <EditIcon sx={{ fontSize: "16px" }} />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon sx={{ fontSize: "16px" }} />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};
