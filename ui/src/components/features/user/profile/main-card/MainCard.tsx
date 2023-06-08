import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FC } from "react";

import { GET_PROFILE_BY_USERNAME, TProfile } from "@/api/graphql/profile";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Skeleton,
  Typography,
} from "@/components/presentational";
import { useSession } from "@/hooks/use-session";

import { ProfilePicture } from "./ProfilePicture";

interface MainCardProps {
  username: string;
}
const MainCard: FC<MainCardProps> = ({ username }) => {
  const router = useRouter();
  const {
    session: { currentUser },
  } = useSession();

  const { data, loading } = useQuery<{ profiles: TProfile[] }>(
    GET_PROFILE_BY_USERNAME,
    {
      variables: {
        username,
      },
    }
  );

  if (!loading && data?.profiles && data?.profiles.length === 0)
    return (
      <Container>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
                flexDirection: "column",
              }}
            >
              <Typography variant="h2">
                This account doesn&#39;t exist
              </Typography>
              <Typography variant="body1">
                Try searching for another.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );

  const profile = data?.profiles[0];
  const fullname = (profile?.firstname ?? "") + " " + (profile?.lastname ?? "");

  const gotoEditProfile = () => {
    router.push("/settings/profile");
  };

  if (!loading && data) {
    return (
      <Container>
        <Card
          sx={{
            maxWidth: 345,
            "& .MuiCardContent-root": {
              position: "relative",
            },
          }}
        >
          <CardMedia
            sx={{
              height: 140,
              borderRadius: "4px 4px 0 0 ",
              borderBottom: "1px solid #eeeeee",
            }}
            image={
              profile?.banner
                ? "/files/profile/picture/" + profile?.banner
                : "./banner.svg"
            }
          />
          <CardContent
            sx={{
              position: "relative",
              paddingLeft: "180px",
              paddingTop: "15px",
              minHeight: "80px",
              "&:last-child": {
                paddingBottom: 0,
              },
            }}
          >
            <ProfilePicture fullname={fullname} picture={profile?.picture} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginRight: "15px",
                minHeight: "50px",
              }}
            >
              <Box>
                <Typography variant="h2">{fullname}</Typography>
                <Typography variant="body1" color="text.secondary">
                  @{username}
                </Typography>
              </Box>
              {currentUser.id === profile?.user_id && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={gotoEditProfile}
                >
                  Edit profile
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />
    </Container>
  );
};

export { MainCard };
