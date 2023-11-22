import { FC } from "react";

import { MainCard } from "./main-card";
import { Stream } from "./Stream";

interface SpaceProps {
  space: string;
}

const Space: FC<SpaceProps> = ({ space }) => {
  const id = parseInt(space, 10); 
  if(!id) return <></>;
    return (
      <>
        <MainCard id={id} />
        <Stream username={"badis"} />
      </>
    );
};

export { Space };
