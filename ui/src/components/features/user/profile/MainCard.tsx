import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@/components/presentational";
import { useRouter } from "next/router";
import { FC } from "react";

interface MainCardProps {
  username: string;
}
const MainCard: FC<MainCardProps> = ({ username }) => {
  const router = useRouter();

  const gotoEditProfile = () => {
    router.push("/settings/profile");
  };

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
          sx={{ height: 140, borderRadius: "4px" }}
          image="https://www.aquasabi.de/media/image/product/9211/lg/black-rocks.jpg"
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
          <Avatar
            alt="Badis Merabet"
            src="https://badis.github.io/assets/photo.png"
            sx={{
              width: 150,
              height: 150,
              top: "-75px",
              left: "15px",
              position: "absolute",
              border: "4px solid white",
              borderRadius: "8px",
            }}
            variant="rounded"
          />
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
              <Typography variant="h4">Badis Merabet</Typography>
              <Typography variant="body1" color="text.secondary">
                @{username}
              </Typography>
            </Box>
            <Button variant="outlined" size="small" onClick={gotoEditProfile}>
              Edit profile
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export { MainCard };
