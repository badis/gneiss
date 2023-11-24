import { FC } from "react";

import { MainCard } from "./main-card";
import { Stream } from "./Stream";
import { useSession } from "@/hooks/use-session";

interface SpaceProps {
  space: string;
}

const Space: FC<SpaceProps> = ({ space }) => {
  const {
    session: { currentUser },
  } = useSession();

  const id = parseInt(space, 10); 
  if(!id) return <></>;
    return (
      <>
        <MainCard id={id} />
        <Stream username={currentUser?.username} space_id={id} />
      </>
    );
};

export { Space };
