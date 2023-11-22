import { FC } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@/components/presentational";

interface SpacesProps {}
const Spaces: FC<SpacesProps> = () => {
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
            <Typography variant="body1">Spaces List</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export { Spaces };
