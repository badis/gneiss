import { useQuery } from "@apollo/client";
import { useTheme } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";

import { GET_PROFILE_BY_USERNAME, TProfile } from "@/api/graphql/profile";
import {
  AdministrationIcon,
  MyAccountIcon,
  MyProfileIcon,
  ProfilePictureIcon,
  SignoutIcon,
} from "@/components/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@/components/presentational";
import { useSession } from "@/hooks/use-session";

interface AccountMenuProps {}
const AccountMenu: FC<AccountMenuProps> = () => {
  const {
    session: { currentUser, signout },
  } = useSession();
  const router = useRouter();

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data, loading } = useQuery<{ profiles: TProfile[] }>(
    GET_PROFILE_BY_USERNAME,
    {
      variables: {
        username: currentUser?.username,
      },
    }
  );

  const profile = data?.profiles[0];
  const fullname = (profile?.firstname ?? "") + " " + (profile?.lastname ?? "");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoMyProfile = () => {
    router.push("/" + currentUser.username);
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
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <Link href="/">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  height: "40px",
                  width: "40px",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  display: "inline-block",
                  margin: "5px",
                }}
              ></Box>
              <Typography variant="h1" color="white">
                Gneiss
              </Typography>
            </Box>
          </Link>
          <Link href="/spaces">
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  sx={{ my: 1, color: 'white', display: 'block' }}
                >
                  Spaces
                </Button>
            </Box>
          </Link>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {profile?.picture && (
              <Avatar
                alt={fullname}
                src={"/files/profile/picture/" + profile?.picture}
                sx={{
                  width: 32,
                  height: 32,
                }}
                variant="circular"
              />
            )}
            {!profile?.picture && (
              <ProfilePictureIcon
                sx={{
                  width: 32,
                  height: 32,
                  padding: "2px",
                  borderRadius: "50%",
                  color: theme.palette.grey[200],
                  bgcolor: "white",
                }}
              />
            )}
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
          <MenuItem onClick={gotoMyProfile}>
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
