import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Container } from "@/components/presentational";
import { PostCreateForm } from "@/components/features/posts/forms";
import { useQuery } from "@apollo/client";
import { GET_POSTS, Post } from "@/api/graphql/post";
import { PostCard } from "@/components/features/posts/PostCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  if (!data) return;
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
          <PostCreateForm />

          {data.posts.map((p: Post, index: number) => (
            <PostCard key={index} post={p} />
          ))}
        </Container>
      </main>
    </>
  );
}
