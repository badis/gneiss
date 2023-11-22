import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { AccountMenu } from "@/components/core/common";
import { Wall } from "@/components/core/dashboard";
import { Skeleton } from "@/components/presentational";
import { useSession } from "@/hooks/use-session";
import styles from "@/styles/layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const {
    session: { isAuthenticated, loading },
  } = useSession();

  useEffect(() => {
    // Protected route
    if (!loading && !isAuthenticated) {
      router.push("/auth/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAuthenticated]);

  if (isAuthenticated && !loading) {
    return (
      <>
        <Head>
          <title>Home</title>
          <meta name="description" content="Home" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
          <AccountMenu />
          <Wall />
        </main>
      </>
    );
  }

  return <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />;
}
