import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const inter = Inter({ subsets: ['latin'] })

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
            <a href="/about">About</a>
            <Box component="form">
              <Button variant="outlined"> 
                Submit
              </Button> 
            </Box>
      </main>
    </>
  )
}
