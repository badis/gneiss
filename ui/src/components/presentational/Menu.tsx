import {
  ListItemIcon,
  ListItemIconProps,
  Menu,
  MenuItem,
  MenuItemProps,
  MenuProps,
} from "@mui/material";
import { FC } from "react";

const StyledMenu: FC<MenuProps> = ({ children, ...props }) => {
  return (
    <Menu
      elevation={1}
      sx={{
        "& .MuiPaper-root": {
          boxShadow: "0 0 3px #dadada",
          minWidth: "150px",
          "& .MuiMenu": {
            // padding: "4px 0",
          },
          "& .MuiMenuItem-root": {
            fontSize: "default",
            padding: "4px 12px",
            "& .MuiListItemIcon-root": {
              minWidth: "25px",
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      {...props}
    >
      {children}
    </Menu>
  );
};

export { StyledMenu as Menu };

const StyledMenuItem: FC<MenuItemProps> = ({ children, ...props }) => {
  return (
    <MenuItem {...props} disableRipple>
      {children}
    </MenuItem>
  );
};

export { StyledMenuItem as MenuItem };

const StyledListItemIcon: FC<ListItemIconProps> = ({ children, ...props }) => {
  return <ListItemIcon {...props}>{children}</ListItemIcon>;
};

export { StyledListItemIcon as ListItemIcon };
