import { FC, useState } from "react";
import { useTheme } from "@mui/material";

import {
  AdministrationIcon,
  MyAccountIcon,
  MyProfileIcon,
  SignoutIcon,
} from "@/components/icons";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@/components/presentational";
import { useSession } from "@/hooks/use-session";

interface AccountMenuProps {}
const AccountMenu: FC<AccountMenuProps> = () => {
  const {
    session: { signout },
  } = useSession();

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        padding: "5px",
        top: 0,
        zIndex: 1000,
        width: "100%",
        bgcolor: `${theme.palette.primary.main}`,
        boxShadow: "0 0px 3px #dadada",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: "12px",
                color: `${theme.palette.primary.main}`,
                bgcolor: `${theme.palette.primary.contrastText}`,
              }}
            >
              BM
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          bgcolor={theme.palette.primary.main}
          color={theme.palette.primary.contrastText}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <MyProfileIcon fontSize="small" />
            </ListItemIcon>
            My profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <MyAccountIcon fontSize="small" />
            </ListItemIcon>
            My account
          </MenuItem>
          <Divider sx={{ bgcolor: theme.palette.primary.main }} />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AdministrationIcon fontSize="small" />
            </ListItemIcon>
            Administration
          </MenuItem>
          <Divider sx={{ bgcolor: theme.palette.primary.main }} />
          <MenuItem onClick={signout}>
            <ListItemIcon>
              <SignoutIcon fontSize="small" />
            </ListItemIcon>
            Sign out
          </MenuItem>
        </Menu>
      </Container>
    </Box>
  );
};

export { AccountMenu };
