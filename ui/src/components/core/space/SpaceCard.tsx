import Link from "next/link";
import { FC } from "react";
import { useTheme } from "@mui/material";

import { TSpace } from "@/api/graphql/space";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@/components/presentational";

interface SpaceCardProps {
  space: TSpace;
}
export const SpaceCard: FC<SpaceCardProps> = ({ space }) => {
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        subheader={
          <Box>
            <Link href={"/spaces/" + space.id}>
              <Typography variant="subtitle1" color={theme.palette.grey[900]}>
                {space.name}
              </Typography>
            </Link>
          </Box>
        }
      />
      <CardContent>
        <Divider />
        <Box>{space.description}</Box>
      </CardContent>
    </Card>
  );
};
