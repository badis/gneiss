import { useQuery } from "@apollo/client";
import { FC } from "react";

import { GET_SPACE_BY_ID, TSpace } from "@/api/graphql/space";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Skeleton,
} from "@/components/presentational";

interface SpaceProps {
  id: string;
}

const Space: FC<SpaceProps> = ({ id }) => {
  const { data, loading } = useQuery<{ space: TSpace }>(GET_SPACE_BY_ID, {
    variables: {
      id,
    },
  });

  if (data && !loading) {
    return (
      <Container>
        <Card>
          <CardContent>
            <Box>{data.space.name}</Box>
            <Divider />
            <Box>{data.space.description}</Box>
            <Box>
              Members:
              {data.space.memberships.map((m) => m.user.username).join(", ")}
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }
  return (
    <Container>
      <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />;
    </Container>
  );
};

export { Space };
