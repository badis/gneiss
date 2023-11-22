import { useQuery } from "@apollo/client";
import { FC } from "react";

import { GET_SPACE_BY_ID, TSpace } from "@/api/graphql/space";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Skeleton,
  Typography,
} from "@/components/presentational";

import { SpacePicture } from "./SpacePicture";

interface MainCardProps {
  id: number;
}
const MainCard: FC<MainCardProps> = ({ id }) => {
  const { data, loading } = useQuery<{ space: TSpace }>(GET_SPACE_BY_ID, {
    variables: {
      id,
    },
  });

  if (!loading && data) {
    const space = data?.space;
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
              space?.banner
                ? "/files/space/picture/" + space?.banner
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
            <SpacePicture name={space.name} picture={space.picture} />

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
                <Typography variant="h2">{space.name}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {space.description}
                </Typography>
              </Box>
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
