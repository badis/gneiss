import { FC } from "react";

interface SpaceProps {
    id: string
}

const Space: FC<SpaceProps> = ({id}) => {
  return <>Space { id }</>;
};

export { Space };
