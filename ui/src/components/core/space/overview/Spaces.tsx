import { useQuery } from "@apollo/client";
import { FC } from "react";

import { GET_ALL_SPACES, SpaceInterface } from "@/api/graphql/space";
import {
  Button,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@/components/presentational";
import { SpaceCard } from "./SpaceCard";
import { CreateSpace } from "./create-space";

interface SpacesProps { }
const Spaces: FC<SpacesProps> = () => {
  const { data, loading: loadingSpaces } = useQuery(GET_ALL_SPACES);

  if (data && !loadingSpaces) {
    return (
      <Container>
        <Grid
          container
          direction="column"
          spacing={{ xs: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid container item sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography variant="h6" component="h4" sx={{ marginBottom: "20px" }}>
                Spaces
              </Typography>
            </Grid>
            <Grid item>
              <CreateSpace />
            </Grid>
          </Grid>
          <Grid container item spacing={{ xs: 2 }}>

            {data.spaces.map((space: SpaceInterface, index: number) => {
              return (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <SpaceCard key={index} space={space} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    );
  }
  return (
    <Container>
      <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />
    </Container>
  );
};

export { Spaces };
