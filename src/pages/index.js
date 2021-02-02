import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { dbConnect, jsonify } from '@/middleware/db'
import Fighter from '@/models/Fighter'
import { useState, useEffect } from 'react'

export default function Home({ fighters }) {
  const [kungfu, setKungfu] = useState(fighters)

  useEffect(async () => {
    await fetch('/api/fighters')
      .then((response) => response.json())
      .then((data) => setKungfu(data))
    console.log(kungfu)
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Mongoose</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Next.js!</h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <div className={styles.grid}>
          {/* {kungfu.map((fighter, index) => (
            <div key={index} className={styles.card}>
              <h3>{fighter.name}</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis!
              </p>
            </div>
          ))} */}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  dbConnect()
  const fighters = await Fighter.find({}).exec()

  return {
    props: {
      fighters: jsonify(fighters),
    },
  }
}
