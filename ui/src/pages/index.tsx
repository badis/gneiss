import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Header } from "@/components/header";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
} from "@/components/presentational";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Container>
          <Header />
          <Card>
            <CardContent>
              <TextField label="Post"></TextField>
            </CardContent>
            <CardActions>
              <Button label="Submit"></Button>
            </CardActions>
          </Card>
        </Container>
      </main>
    </>
  );
}
