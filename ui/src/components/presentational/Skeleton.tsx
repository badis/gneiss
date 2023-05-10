import { Skeleton, SkeletonProps } from "@mui/material";
import { FC } from "react";

const StyledSkeleton: FC<SkeletonProps> = (props) => {
  return <Skeleton {...props} />;
};

export { StyledSkeleton as Skeleton };
