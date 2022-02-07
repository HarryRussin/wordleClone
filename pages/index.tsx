import Head from 'next/head'
import { useEffect, useLayoutEffect, useState } from 'react'
import Wordle from '../components/wordle'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import Navbar from '../components/navbar'

export default function Home() {
  const [playingWithValid, setplayingWithValid] = useState(true)
  const [dark, setdark] = useState(true)
  const [scores, setscores] = useState(0)
  const [health, sethealth] = useState(3)

  const handleDark = () => {
    setdark(!dark)
    localStorage.setItem('dark', dark.toString())
  }

  useLayoutEffect(() => {
    let score = localStorage.getItem('score')
    let x = localStorage.getItem('dark')
    let health = localStorage.getItem('health')

    if (health) {
      sethealth(parseInt(health))
      console.log(health)
    }
    if (score) {
      setscores(parseInt(score))
    }
    if (x === 'true') {
      console.log('light/false')
      setdark(false)
    }
    if (x === 'false') {
      console.log('true/dark')
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

      <Navbar
        scores={scores}
        health={health}
        playingWithValid={playingWithValid}
        setplayingWithValid={setplayingWithValid}
        dark={dark}
        handleDark={handleDark}
      />

      {health > 0 ? (
        <Wordle
          sethealth={sethealth}
          health={health}
          playingWithValid={playingWithValid}
          scores={scores}
          setscores={setscores}
          dark={dark}
        />
      ) : (
        <p className={` mt-32 text-2xl text-center ${dark ? 'text-white' : 'text-black'}`}>you died <br/> there is no way to try again. you lost. you deserve this.<br/>L</p>
      )}
    </div>
  )
}
