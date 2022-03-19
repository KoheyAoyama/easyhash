import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [inputText, setInputText] = useState<string>('')
  const [hashtags, setHashtags] = useState<string[]>([])
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])

  const baseTweetURL: string = "https://twitter.com/intent/tweet?hashtags="
  const fullTweetURL: string = baseTweetURL + selectedHashtags.toString()

  return (
    <div className={styles.container}>
      <Head>
        <title>Easyhash</title>
        <meta name="description" content="Tweet with hashtag really easy!" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:widgets:autoload" content="off"></meta>
        <link rel="canonical" href="/"></link>
        <link rel="me" href="https://twitter.com/TwitterDev"></link>
      </Head>

      <main className={styles.main}>
        <div>
          <input required type="text" value={inputText} onChange={e => setInputText(e.target.value)}></input>
          <button
            onClick={() => {
              if(inputText == '') return
              if(hashtags.includes(inputText)) return
              const updatedHashtags: string[] = [...hashtags, inputText]
              setHashtags(updatedHashtags)
            }}
          >Add</button>
        </div>

        <ul>
          {hashtags.map(item => {
            return (
              <li key={item}>
                {item}
                <button onClick={() => {
                  const updatedHashtags: string[] = [...selectedHashtags, item]
                  setSelectedHashtags(updatedHashtags)
                }}>
                  Select
                </button>
                <button onClick={() => {
                  const updatedHashtags: string[] = hashtags.filter(tag => tag != item)
                  setHashtags(updatedHashtags)
                }}>
                  Delete
                </button>
              </li>
            )
          })}
        </ul>

        <ul>
          {selectedHashtags.map(item => {
            return (
              <li key={item}>
                {item}
                <button onClick={() => {
                  const updatedHashtags: string[] = selectedHashtags.filter(tag => tag != item)
                  setSelectedHashtags(updatedHashtags)
                }}>
                  Remove
                </button>
              </li>
            )
          })}
        </ul>
        <a className={styles.tweetButton} target='_blank' href={fullTweetURL}>Tweet</a>
      </main>
    </div>
  )
}

export default Home
