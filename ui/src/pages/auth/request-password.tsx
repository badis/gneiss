import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useEffect } from "react";
import { RequestPassword } from "@/components/features/user/auth";
import { Container, Skeleton } from "@/components/presentational";
import { useSession } from "@/hooks/use-session";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function RequestPasswordPage() {
  const router = useRouter();
  const {
    session: { isAuthenticated, loading },
  } = useSession();

  useEffect(() => {
    // Non protected route
    if (!loading && isAuthenticated) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAuthenticated]);

  if (!loading && !isAuthenticated) {
    return (
      <>
        <Head>
          <title>Password recovery</title>
          <meta name="description" content="Password recovery" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${inter.className}`}>
          <Container>
            <RequestPassword />
          </Container>
        </main>
      </>
    );
  }

  return <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />;
}
