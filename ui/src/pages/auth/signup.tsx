import Head from "next/head";
import { Inter } from "next/font/google";
import React, { useEffect } from "react";
import { Signup } from "@/components/core/user/auth";
import { Container, Skeleton } from "@/components/presentational";
import { useRouter } from "next/router";
import { useSession } from "@/hooks/use-session";

const inter = Inter({ subsets: ["latin"] });

export default function SignupPage() {
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
          <title>Sign up</title>
          <meta name="description" content="Sign up" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={`${inter.className}`}>
          <Container>
            <Signup />
          </Container>
        </main>
      </>
    );
  }

  return <Skeleton variant="rectangular" width={"100hw"} height={"1vh"} />;
}
