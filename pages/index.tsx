import Head from 'next/head'
import { useState } from 'react'
import { goalwords, checkwords } from '../words'

interface Keys {
  letter: string
  accuracy: string
}

const data: Keys[][] = [
  // STARTER DATA FOR GUESSES
  [
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
  ],
  [
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
  ],
  [
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
  ],
  [
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
  ],
  [
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
  ],
  [
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
    { letter: '', accuracy: '' },
  ],
]

const keys: Keys[][][] = [
  //TOTAL KEYS
  [
    //ROWS OF KEYBOARD
    [
      //THE KEYS THEMSELVES
      { letter: 'Q', accuracy: '' },
      { letter: 'W', accuracy: '' },
      { letter: 'E', accuracy: '' },
      { letter: 'R', accuracy: '' },
      { letter: 'T', accuracy: '' },
      { letter: 'Y', accuracy: '' },
      { letter: 'U', accuracy: '' },
      { letter: 'I', accuracy: '' },
      { letter: 'O', accuracy: '' },
      { letter: 'P', accuracy: '' },
    ],
  ],
  [
    [
      { letter: 'A', accuracy: '' },
      { letter: 'S', accuracy: '' },
      { letter: 'D', accuracy: '' },
      { letter: 'F', accuracy: '' },
      { letter: 'G', accuracy: '' },
      { letter: 'H', accuracy: '' },
      { letter: 'J', accuracy: '' },
      { letter: 'K', accuracy: '' },
      { letter: 'L', accuracy: '' },
    ],
  ],
  [
    [
      { letter: 'ENTER', accuracy: '' },
      { letter: 'Z', accuracy: '' },
      { letter: 'X', accuracy: '' },
      { letter: 'C', accuracy: '' },
      { letter: 'V', accuracy: '' },
      { letter: 'B', accuracy: '' },
      { letter: 'N', accuracy: '' },
      { letter: 'M', accuracy: '' },
      { letter: 'DELETE', accuracy: '' },
    ],
  ],
]

const CorrectWordle = goalwords[Math.floor(Math.random() * goalwords.length)]

export default function Home() {
  const [wordles, setwordles] = useState(data)
  const [keyboard, setkeyboard] = useState(keys)
  const [wordlePos, setwordlePos] = useState(0)
  const [wordleNum, setwordleNum] = useState(0)
  const [title, settitle] = useState('HERDLE')
  const [gameOver, setgameOver] = useState(false)
  const [invalid, setinvalid] = useState(false)
  const [playingWithValid, setplayingWithValid] = useState(false)

  const handleKeyPress = (key: any) => {
    setinvalid(false)
    if (gameOver) {
      return
    }
    if (key.letter === 'ENTER') {
      if (wordleNum <= 5 && wordlePos === 5) {
        checkAndSubmitWord()
      }
      return
    } else if (key.letter === 'DELETE') {
      if (wordlePos <= 5 && wordlePos >= 1) {
        setwordlePos(wordlePos - 1)
        addKeyToWordle('', wordlePos - 1)
      }
      return
    } else if (wordlePos <= 4) {
      addKeyToWordle(key.letter, wordlePos)
      setwordlePos(wordlePos + 1)
    }
  }

  const loseGame = () => {
    settitle(":( you didn't get it, the word was: " + CorrectWordle)
    setgameOver(true)
  }

  const checkAndSubmitWord = () => {
    let wordCheck = wordles[wordleNum]
    let wordlesCop = wordles.slice()

    const titles: string[] = []
    wordles[wordleNum].map((letter) => {
      titles.push(letter.letter)
    })


    if (playingWithValid){
    if (!checkwords.includes(titles.join('').toLowerCase())) {
      console.log(wordlesCop)

      for (let i = 0; i < wordCheck.length; i++) {
        wordlesCop[wordleNum][i].accuracy = 'incorrect'
      }
      console.log(wordlesCop)

      settitle('that is not a valid word')
      setinvalid(true)
      return
    }
  }

    if (wordleNum === 5 && titles.join('') !== CorrectWordle.toUpperCase()) {
      loseGame()
      return
    }

    for (let i = 0; i < wordCheck.length; i++) {
      if (CorrectWordle.toUpperCase()[i] === wordCheck[i].letter) {
        SearchKeyboard(wordCheck[i].letter, 'correct')
        wordlesCop[wordleNum][i].accuracy = 'correct'
      } else if (
        CorrectWordle.toUpperCase().split('').includes(wordCheck[i].letter)
      ) {
        SearchKeyboard(wordCheck[i].letter, 'placementErr')
        wordlesCop[wordleNum][i].accuracy = 'placementErr'
      } else {
        SearchKeyboard(wordCheck[i].letter, 'used')
        wordlesCop[wordleNum][i].accuracy = 'used'
      }
    }

    if (titles.join('') === CorrectWordle.toUpperCase()) {
      winWordle()
      return
    }
    setwordleNum(wordleNum + 1)
    setwordlePos(0)
    setwordles(wordlesCop)

    settitle(' ')
  }

  const SearchKeyboard = (key: string, modification: string) => {
    let keyboardCop = keyboard.slice()
    keyboardCop.forEach((letters) => {
      letters[0].forEach((letter) => {
        if (letter.letter === key) {
          letter.accuracy = modification
        }
      })
    })
  }

  const addKeyToWordle = (key: string, pos: number) => {
    const wordleCop = wordles.slice()
    wordles[wordleNum][pos].letter = key

    setwordles(wordleCop)
    const titles: string[] = []
    wordles[wordleNum].map((letter) => {
      titles.push(letter.letter)
    })
    settitle(titles.join('').toString())
  }

  const winWordle = () => {
    console.log('you won!')
    settitle('You won! Congratulations!')
    setgameOver(true)
  }

  return (
    <div>
      <Head>
        <title>Herdle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* body - GLOBAL */}
      <style jsx global>
        {`
          body {
            background: black;
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }
        `}
      </style>

      {/* <div className="absolute top-1 right-1 text-white">hi</div> */}
      <div onClick={()=>setplayingWithValid(!playingWithValid)} className="absolute top-2 text-white left-2">
        {
          playingWithValid
          ?<p>Play with any inputs?</p>
          :<p>Play with only valid words?</p>
        }
        
      </div>

      <div className="mt-10 flex w-full flex-col justify-center md:mt-20 md:flex-row">
        {/* Grid */}

        <div className="mx-auto w-fit md:mx-0">
          {wordles.map((row) => (
            <div className=" grid grid-cols-5">
              {row.map((key) => (
                <p
                  className={`wordle
                ${key.accuracy === 'correct' && 'bg-green-500'}
                ${key.accuracy === 'placementErr' && 'bg-yellow-500'}
                ${invalid && key.accuracy === 'incorrect' ? 'bg-red-500' : ''}
                `}
                >
                  {key.letter}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Keyboard */}
        <div className="mx-5 text-center">
          <h1 className="my-4 flex h-auto min-h-[2.5rem] items-center justify-center border border-white p-1 text-xl text-white md:my-10 md:text-3xl">
            {title}
          </h1>
          <div className="mb-5 flex flex-col items-center justify-center">
            {keyboard.map((rows) => (
              <div className={`my-[0.25rem] flex gap-1 text-white md:gap-2`}>
                {rows[0].map((key) => (
                  <h1
                    onClick={() => handleKeyPress(key)}
                    className={`h-fit w-fit transition-all hover:bg-gray-200 ${
                      key.accuracy === '' && 'bg-white'
                    } px-2 py-3 text-black md:px-5 md:py-2 
                    ${key.accuracy === 'correct' && 'bg-green-500'}
                    ${key.accuracy === 'used' && 'bg-gray-500'}
                    ${key.accuracy === 'placementErr' && 'bg-yellow-500'}`}
                  >
                    {key.letter}
                  </h1>
                ))}
              </div>
            ))}
            {gameOver && (
              <a href="/" className="mt-1 text-white">
                click me to try again!
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
