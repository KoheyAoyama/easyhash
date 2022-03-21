import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Head from 'next/head'

const Home: NextPage = () => {
  const [inputText, setInputText] = useState<string>('')
  const [tweetBody, setTweetBody] = useState<string>('')
  const [hashtags, setHashtags] = useState<string[]>([])
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>([])

  const baseTweetURL: string = "https://twitter.com/share"
  const fullTweetURL: string = baseTweetURL + '?text=' + tweetBody + '&hashtags=' + selectedHashtags.toString()
  const reg = new RegExp(/[!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~ ]/g);

  useEffect(() => {
    const savedHashtagsData: string | null = window.localStorage.getItem('hashtags')
    if(savedHashtagsData == undefined || savedHashtagsData == '') return
    const savedHashtagsArray: string[] = savedHashtagsData.split(',')
    setHashtags(savedHashtagsArray)
  },[])

  useEffect(() => {
    window.localStorage.setItem('hashtags', hashtags.toString())
  }, [hashtags])

  return (
    <div className="h-screen">
      <Head>
        <title>Easyhash</title>
        <meta name="description" content="Tweet with hashtag really easy!" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:widgets:autoload" content="off"></meta>
        <link rel="canonical" href="/"></link>
        <link rel="me" href="https://twitter.com/TwitterDev"></link>
      </Head>

      <main className="flex flex-col items-center justify-center p-8 m-auto max-w-3xl">
        <div className="flex items-center w-full h-14 pl-6 p-2 mb-9 rounded-full bg-slate-100">
          <input
            className="grow h-full bg-transparent focus:outline-none"
            required
            type="text"
            value={inputText}
            placeholder="よく使うハッシュタグを入力..."
            onChange={e => setInputText(e.target.value)}>
          </input>
          <button
            className="px-6 h-full rounded-full bg-slate-600 text-white"
            onClick={() => {
              const alphanumericInputText: string = inputText.replaceAll(reg,"")
              if(alphanumericInputText == '') return
              if(hashtags.includes(alphanumericInputText)) return
              const updatedHashtags: string[] = [...hashtags, alphanumericInputText]
              setHashtags(updatedHashtags)
              setInputText('')
            }}
          >
            Add Hashtag
          </button>
        </div>

        <ul className="w-full mb-10">
          {hashtags.map(item => {
            return (
              <li
                key={item}
                className="flex items-center h-14 px-4 border-b border-slate-300"
              >
                <p className="grow">{item}</p>
                <button
                  className="px-4 h-8 rounded-l-full bg-slate-600 text-white"
                  onClick={() => {
                    if(selectedHashtags.includes(item)) return
                    const updatedHashtags: string[] = [...selectedHashtags, item]
                    setSelectedHashtags(updatedHashtags)
                  }}
                >
                  Select
                </button>
                <button
                  className="px-4 h-8 rounded-r-full bg-red-500 text-white"
                  onClick={() => {
                    const updatedHashtags: string[] = hashtags.filter(tag => tag != item)
                    setHashtags(updatedHashtags)
                  }}
                >
                  Delete
                </button>
              </li>
            )
          })}
        </ul>

        <ul className="flex flex-wrap gap-2 w-full mb-4">
          {selectedHashtags.map(item => {
            return (
              <li key={item} className="flex gap-x-4 pl-5 p-2 rounded-full bg-slate-300">
                {item}
                <button
                  className="px-2 h-7 rounded-full bg-slate-100 text-slate-400"
                  onClick={() => {
                    const updatedHashtags: string[] = selectedHashtags.filter(tag => tag != item)
                    setSelectedHashtags(updatedHashtags)
                  }}
                >
                  Remove
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center w-full p-6 mb-6 rounded-2xl bg-slate-100">
          <textarea
            className="grow h-full bg-transparent focus:outline-none"
            rows={4}
            maxLength={140}
            onChange={e => setTweetBody(e.target.value)}
          >
          </textarea>
        </div>

        <a
          className="flex items-center justify-center h-14 w-full rounded-full bg-blue-500 font-semibold text-white"
          target='_blank'
          rel="noreferrer"
          href={fullTweetURL}
        >
          <p>Tweet</p>
        </a>
      </main>
    </div>
  )
}

export default Home
