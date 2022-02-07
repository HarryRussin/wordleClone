import React, { useEffect, useState } from 'react'
import { checkwords, goalwords,keys,letters,data } from '../words'

interface Keys {
  letter: string
  accuracy: string
}


const CorrectWordle = goalwords[Math.floor(Math.random() * goalwords.length)]

function Wordle({ dark, playingWithValid, setscores, scores, sethealth, health }: any) {
  const [wordles, setwordles] = useState(data)
  const [keyboard, setkeyboard] = useState(keys)
  const [wordlePos, setwordlePos] = useState(0)
  const [wordleNum, setwordleNum] = useState(0)
  const [title, settitle] = useState('HERDLE')
  const [gameOver, setgameOver] = useState(false)
  const [invalid, setinvalid] = useState(false)

  const keyboardpress = (e: any) => {
    const key = { letter: e.key.toUpperCase() }

    handleKeyPress(key)
  }

  useEffect(() => {
    window.addEventListener('keydown', keyboardpress)
    return () => {
      window.removeEventListener('keydown', keyboardpress)
    }
  }, [keyboardpress])

  const handleKeyPress = (key: any) => {
    console.log(CorrectWordle);
    if (gameOver) {
      return
    }

    if (key.letter === 'ENTER') {
      if (wordleNum <= 5 && wordlePos === 5) {
        checkAndSubmitWord()
      }
      return
    } else if (key.letter === 'DEL' || key.letter === 'BACKSPACE') {
      if (wordlePos <= 5 && wordlePos >= 1) {
        setwordlePos(wordlePos - 1)
        addKeyToWordle('', wordlePos - 1)
        setinvalid(false)
      }
      return
    } else if (wordlePos <= 4) {
      if(!letters.includes(key.letter.toLowerCase())){
        return
      }
      addKeyToWordle(key.letter, wordlePos)
      setinvalid(false)

      setwordlePos(wordlePos + 1)
    }
  }

  const handleScore = () => {
    const score = scores + 6 - wordleNum
    setscores(score)
    localStorage.setItem('score', score.toString())
  }

  const handleHeath = ()=>{
    const healths:number = health-1
    if (healths === 0){
      settitle('You Died!')
    }
    sethealth(healths)
    localStorage.setItem('health', healths.toString())
  }

  const loseGame = () => {
    settitle(":( you didn't get it, the word was: " + CorrectWordle)
    handleHeath()
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

        for (let i = 0; i < wordCheck.length; i++) {
          wordlesCop[wordleNum][i].accuracy = 'incorrect'
        }

        settitle('that is not a valid word')
        setinvalid(true)
        return
      }
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

    if (wordleNum === 5 && titles.join('') !== CorrectWordle.toUpperCase()) {
      loseGame()
      return
    }

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
    setkeyboard(keyboardCop)
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
    handleScore()
    setgameOver(true)
  }

  return (
    <div>
      <div className="mb-0 mt-10 flex w-full flex-col justify-center lg:my-10 lg:flex-row">
        {/* Grid */}

        <div className="mx-auto w-fit rounded-xl p-4 lg:mx-0">
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
        <div
          className={`mx-5 text-center ${!dark ? 'text-black' : 'text-white'}`}
        >
          <h1
            className={`my-4 flex h-auto min-h-[2.5rem] items-center justify-center text-ellipsis text-xl transition-all  md:my-10 md:text-3xl`}
          >
            {title}
          </h1>
          <div className="mb-5 flex flex-col items-center justify-center">
            {keyboard.map((rows) => (
              <div className={`my-[0.25rem] flex gap-1 md:gap-2`}>
                {rows[0].map((key) => (
                  <h1
                    onClick={() => handleKeyPress(key)}
                    className={`h-fit w-fit transition-all text-xs md:text-xl hover:bg-gray-200 ${
                      key.accuracy === '' && 'bg-white'
                    } px-2 py-3 text-black md:px-5 md:py-2 
                    ${!dark && key.accuracy === '' ? 'bg-gray-200' : ''}
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
              <a
                href="/"
                className={`mt-1  ${!dark ? 'text-black' : 'text-white'}`}
              >
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
