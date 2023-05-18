import { Button } from "@/components/presentational";
import { useSession } from "@/hooks/use-session";
import { FC } from "react";

interface AccountMenuProps {}
const AccountMenu: FC<AccountMenuProps> = () => {
  const {
    session: { signout },
  } = useSession();

  return (
    <>
      <Button onClick={signout}>Sign out</Button>
    </>
  );
};

export { AccountMenu };
