import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@/components/presentational";
import { FC } from "react";

interface ProfileProps {
  username: string;
}
const Profile: FC<ProfileProps> = ({ username }) => {
  return (
    <Container>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="https://www.aquasabi.de/media/image/product/9211/lg/black-rocks.jpg"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            @{username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Title
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">About</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export { Profile };
