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

  const space_id = parseInt(space, 10); 
  if(!space_id) return <></>;
    return (
      <>
        <MainCard space_id={space_id} />
        <Stream username={currentUser?.username} space_id={space_id} />
      </>
    );
};

export { Space };
