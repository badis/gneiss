import { Inter } from "next/font/google";
import Head from "next/head";
import React from "react";

import styles from "@/styles/layout.module.css";
import { AccountMenu } from "@/components/core/common";
import { EditProfile } from "@/components/core/user/profile";

const inter = Inter({ subsets: ["latin"] });

export default function SettingsProfilePage() {
  return (
    <>
      <Head>
        <title>Edit Profile</title>
        <meta name="description" content="Edit Profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={` ${styles.main} ${inter.className}`}>
        <AccountMenu />
        <EditProfile />
      </main>
    </>
  );
}
