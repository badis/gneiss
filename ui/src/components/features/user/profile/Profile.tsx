import { FC } from "react";

import { MainCard } from "./MainCard";
import { Stream } from "./Stream";

interface ProfileProps {
  username: string;
}
const Profile: FC<ProfileProps> = ({ username }) => {
  return (
    <>
      <MainCard username={username} />
      <Stream />
    </>
  );
};

export { Profile };
