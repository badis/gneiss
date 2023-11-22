import { useQuery } from "@apollo/client";
import { FC } from "react";

import { GET_ALL_SPACES, TSpace } from "@/api/graphql/space";
import {
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@/components/presentational";
import { SpaceCard } from ".";

interface SpacesProps {}
const Spaces: FC<SpacesProps> = () => {
  const { data, loading: loadingSpaces } = useQuery(GET_ALL_SPACES);

  if (data && !loadingSpaces) {
    return (
      <Container>
        <Typography variant="h6" component="h4" sx={{ marginBottom: "20px" }}>
          Spaces
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.spaces.map((s: TSpace, index: number) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <SpaceCard key={index} space={{ ...s }} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }
  return (
    <Container>
      <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />;
    </Container>
  );
};

export { Spaces };
