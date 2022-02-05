import React, { useState } from 'react'
import { checkwords, goalwords } from '../words'

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
        { letter: 'DEL', accuracy: '' },
      ],
    ],
  ]
  
  const CorrectWordle = goalwords[Math.floor(Math.random() * goalwords.length)]

function Wordle({dark,playingWithValid}:any) {
  const [wordles, setwordles] = useState(data)
  const [keyboard, setkeyboard] = useState(keys)
  const [wordlePos, setwordlePos] = useState(0)
  const [wordleNum, setwordleNum] = useState(0)
  const [title, settitle] = useState('HERDLE')
  const [gameOver, setgameOver] = useState(false)
  const [invalid, setinvalid] = useState(false)

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
    } else if (key.letter === 'DEL') {
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

    if (playingWithValid) {
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


      <div className="mb-0 mt-10 md:my-10 flex w-full flex-col justify-center md:flex-row">
        {/* Grid */}

        <div className="mx-auto w-fit md:mx-0 p-4 rounded-xl">
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
        <div className={`mx-5 text-center ${
          !dark ? 'text-black' : 'text-white'
        }`}>
          <h1 className={`my-4 flex h-auto transition-all min-h-[2.5rem] items-center justify-center text-ellipsis text-xl  md:my-10 md:text-3xl`}>
            {title}
          </h1>
          <div className="mb-5 flex flex-col items-center justify-center">
            {keyboard.map((rows) => (
              <div className={`my-[0.25rem] flex gap-1 md:gap-2`}>
                {rows[0].map((key) => (
                  <h1
                    onClick={() => handleKeyPress(key)}
                    className={`h-fit w-fit transition-all hover:bg-gray-200 ${
                      key.accuracy === '' && 'bg-white'
                    } px-2 py-3 text-black md:px-5 md:py-2 
                    ${!dark && key.accuracy===''?'bg-gray-200':''}
                    ${key.accuracy === 'correct' && 'bg-green-500'}
                    ${key.accuracy === 'used' && 'bg-gray-500'}
                    ${key.accuracy === 'placementErr' && 'bg-yellow-500'}
                    `}
                  >
                    {key.letter}
                  </h1>
                ))}
              </div>
            ))}
            {gameOver && (
              <a href="/" className={`mt-1  ${
                !dark ? 'text-black' : 'text-white'
              }`}>
                click me to try again!
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wordle
