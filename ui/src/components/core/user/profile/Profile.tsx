import { FC } from "react";

import { MainCard } from "./main-card";
import { Stream } from "./Stream";

interface ProfileProps {
  username: string;
}
const Profile: FC<ProfileProps> = ({ username }) => {
  if (!username) return <></>;

  return (
    <>
      <MainCard username={username} />
      <Stream username={username} />
    </>
  );
};

export { Profile };
