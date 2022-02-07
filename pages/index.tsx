import Head from 'next/head'
import { useEffect, useLayoutEffect, useState } from 'react'
import Wordle from '../components/wordle'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'

export default function Home() {
  const [playingWithValid, setplayingWithValid] = useState(true)
  const [dark, setdark] = useState(true)

  const handleDark = ()=>{
    setdark(!dark)
    localStorage.setItem('dark',dark.toString())
  }

  useLayoutEffect(() => {
    let x =localStorage.getItem('dark')
    if (x === 'true'){
      console.log('light/false');
      setdark(false)
    }
    if (x === 'false') {
      console.log('true/dark');
      setdark(true)
    }
  }, [])

  return (
    <div className="my-10 mx-8 flex items-center justify-center overflow-hidden rounded-lg  transition-all">
      <style jsx global>
        {`
          body {
            background-color: ${dark ? 'black' : 'white'};
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }
        `}
      </style>

      <div
        onClick={() => setplayingWithValid(!playingWithValid)}
        className={`absolute top-2 left-2 ${
          dark ? 'text-white' : 'text-black'
        }`}
      >
        {playingWithValid ? (
          <p>Play with any inputs?</p>
        ) : (
          <p>Play with only valid words?</p>
        )}
      </div>
      <div
        onClick={handleDark}
        className={`absolute top-2 right-2 ${
          dark ? 'text-white' : 'text-black'
        }`}
      >
        {!dark ? <MoonIcon className="w-6" /> : <SunIcon className="w-6" />}
      </div>

      <Wordle playingWithValid={playingWithValid} dark={dark} />
    </div>
  )
}
