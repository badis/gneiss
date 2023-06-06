import Image, { ImageProps } from "next/image";
import { FC } from "react";
import { Box } from "./Box";

const StyledImage: FC<ImageProps> = ({ alt, style, ...props }) => {
  return (
    <Box
      sx={{
        width: "100%",
        "> div": {
          position: "unset !important",
        },
      }}
    >
      <Image
        alt={alt}
        {...props}
        style={{
          objectFit: "contain",
          width: "100%",
          position: "relative",
          height: "unset",
          ...style,
        }}
      />
    </Box>
  );
};

export { StyledImage as Img };
