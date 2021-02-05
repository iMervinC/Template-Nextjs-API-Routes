import Head from 'next/head'
import { signIn, signOut, useSession } from 'next-auth/client'
import styles from '../../styles/Home.module.css'
import { dbConnect, jsonify } from '@/middleware/db'
import Fighter from '@/models/Fighter'
import { useEffect } from 'react'

export const getServerSideProps = async (context) => {
  dbConnect()
  const fighters = await Fighter.find({}).exec()

  return {
    props: {
      fighters: jsonify(fighters),
    },
  }
}

export default function Home({ fighters }) {
  const [session, loading] = useSession()

  useEffect(async () => {
    const res = await fetch('/api/fighters')
    const json = await res.json()
    // console.log(json)
  }, [session])

  return (
    <div className={styles.container}>
      <Head>
        <title>Mongoose</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        {session ? (
          <a href={`/api/auth/signout`} onClick={signOut}>
            Log out
          </a>
        ) : (
          <a href={`/api/auth/signin`} onClick={signIn}>
            Log In
          </a>
        )}
      </header>
      <main className={styles.main}>
        {session ? (
          <>
            <h1 className={styles.title}>
              Welcome to Next.js You are Logged in
            </h1>
          </>
        ) : (
          <h1 className={styles.title}>
            Welcome to Next.js Next Auth You are not Logged in
          </h1>
        )}

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <div className={styles.grid}>
          {fighters.map((fighter, index) => (
            <div key={index} className={styles.card}>
              <h3>{fighter.name}</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis!
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
