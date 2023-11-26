import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@/styles/layout.module.css";
import { AccountMenu } from "@/components/core/common";
import { Profile } from "@/components/core/user/profile";

const inter = Inter({ subsets: ["latin"] });

export default function ProfilePage() {
  const router = useRouter();
  const title = router.isReady
    ? `@${router.query.username as string} | Gneiss `
    : "Gneiss";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="About page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <AccountMenu />
        <Profile username={router.query.username as string} />
      </main>
    </>
  );
}
