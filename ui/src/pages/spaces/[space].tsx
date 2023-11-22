import { Inter } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@/styles/layout.module.css";
import { AccountMenu } from "@/components/features/common";
import { Space } from "@/components/features/space";

const inter = Inter({ subsets: ["latin"] });

export default function SpacePage() {
  const router = useRouter();
  const title = router.isReady
    ? `Space ${router.query.space} | Gneiss `
    : "Gneiss";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Space page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <AccountMenu />
        <Space id={router.query.space as string} />
      </main>
    </>
  );
}
