import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import React from 'react'

interface Props {
  playingWithValid: boolean
  setplayingWithValid: Function
  dark: boolean
  handleDark: Function
  scores: number
  health: number
}

function Navbar({
  playingWithValid,
  setplayingWithValid,
  dark,
  handleDark,
  scores,
  health,
}: Props) {
  return (
    <>
      <div className="absolute top-0 hidden w-full items-center justify-between p-2 md:flex">
        {/* valid words */}
        <div
          onClick={() => setplayingWithValid(!playingWithValid)}
          className={`${dark ? 'text-white' : 'text-black'}`}
        >
          {playingWithValid ? (
            <p>Play with any inputs?</p>
          ) : (
            <p>Play with only valid words?</p>
          )}
        </div>

        {/* scores */}

        <div
          className={`
      mr-16 flex space-x-8 text-2xl
      ${dark ? 'text-white' : 'text-black'}`}
        >
          <div className="flex space-x-1">
            {[...Array(health)].map(() => (
              <HeartIcon className="w-6 text-red-500" />
            ))}
          </div>
          <p>SCORE: {scores}</p>
        </div>

        {/* dark mode */}

        <div
          onClick={() => handleDark()}
          className={`${dark ? 'text-white' : 'text-black'}`}
        >
          {!dark ? <MoonIcon className="w-6" /> : <SunIcon className="w-6" />}
        </div>
      </div>
      <div className="absolute top-0 flex w-full flex-col p-2 md:hidden">
        <div className="flex w-full justify-between">
          <div
            onClick={() => setplayingWithValid(!playingWithValid)}
            className={`${dark ? 'text-white' : 'text-black'}`}
          >
            {playingWithValid ? (
              <p>Play with any inputs?</p>
            ) : (
              <p>Play with only valid words?</p>
            )}
          </div>
          <div
            onClick={() => handleDark()}
            className={`${dark ? 'text-white' : 'text-black'}`}
          >
            {!dark ? <MoonIcon className="w-6" /> : <SunIcon className="w-6" />}
          </div>
        </div>
        <div
          className={`
        text-lg 
      ${dark ? 'text-white' : 'text-black'}`}
        >
          <p>SCORE: {scores}</p>

          <div className="h-6 flex">
            {[...Array(health)].map(() => (
              <HeartIcon className="w-6 text-red-500" />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
