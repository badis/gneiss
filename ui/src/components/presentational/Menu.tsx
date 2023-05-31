import {
  ListItemIcon,
  ListItemIconProps,
  Menu,
  MenuItem,
  MenuItemProps,
  MenuList,
  MenuListProps,
  MenuProps,
} from "@mui/material";
import { FC } from "react";

interface MyMenuProps extends MenuProps {
  bgcolor?: string;
  color?: string;
}

const StyledMenu: FC<MyMenuProps> = ({
  children,
  bgcolor,
  color,
  ...props
}) => {
  return (
    <Menu
      elevation={1}
      disableScrollLock={true}
      sx={{
        "& .MuiPaper-root": {
          bgcolor: bgcolor,
          color: color,
          boxShadow: "0 0 3px #dadada",
          minWidth: "150px",
          "& .MuiMenu": {
            // padding: "4px 0",
          },
          "& .MuiMenuItem-root": {
            fontSize: "default",
            padding: "4px 12px",
            "& .MuiListItemIcon-root": {
              color: color,
              minWidth: "25px",
            },
          },
        },
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 0px 3px #dadada)",
          mt: 1.5,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: bgcolor ?? "white",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
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

const StyledMenuList: FC<MenuListProps> = ({ children, ...props }) => {
  return <MenuList {...props}>{children}</MenuList>;
};

export { StyledMenuList as MenuList };

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
