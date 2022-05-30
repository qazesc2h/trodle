import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'
import { localeAwareUpperCase } from '../../lib/words'
import arrayShuffle from 'array-shuffle'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  solution: string
  guesses: string[]
  isRevealing?: boolean
  isGameOver: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  isRevealing,
  isGameOver,
}: Props) => {
  const charStatuses = getStatuses(solution, guesses)
  const keyLayout = [
    [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ],
    [
      ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'],
      ['T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    ],
    (() => {
      const randomLayout = arrayShuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''))
      return [
        randomLayout.slice(0, 10),
        randomLayout.slice(10, 19),
        randomLayout.slice(19),
      ]
    })(),
    [
      ['Q', 'W', 'F', 'P', 'G', 'J', 'L', 'U', 'Y'],
      ['A', 'R', 'S', 'T', 'D', 'H', 'N', 'E', 'I', 'O'],
      ['Z', 'X', 'C', 'V', 'B', 'K', 'M'],
    ],
    [[], [], 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')],
    [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ],
    [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ],
  ]

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = localeAwareUpperCase(e.key)
        // TODO: check this test if the range works with non-english letters
        if (guesses.length === 4) {
          onChar(key)
        } else if (key.length === 1 && key >= 'A' && key <= 'Z') {
          // onChar(key)
          const idx = 'QWERTYUIOPASDFGHJKLZXCVBNM'
            .split('')
            .findIndex((ch) => ch === key)
          if (idx < 10) {
            onChar(keyLayout[guesses.length][0][idx])
          } else if (idx < 19) {
            onChar(keyLayout[guesses.length][1][idx - 10])
          } else if (idx < 26) {
            onChar(keyLayout[guesses.length][2][idx - 19])
          }
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar, guesses, keyLayout])

  return (
    <div>
      <div className="flex justify-center mb-1">
        {keyLayout[guesses.length][0].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            isTransparent={guesses.length === 5 && !isGameOver}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {keyLayout[guesses.length][1].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            isTransparent={guesses.length === 5 && !isGameOver}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {guesses.length % 2 === 0 || isGameOver ? (
          <Key width={65.4} value="ENTER" onClick={onClick}>
            {ENTER_TEXT}
          </Key>
        ) : (
          <Key width={65.4} value="DELETE" onClick={onClick}>
            {DELETE_TEXT}
          </Key>
        )}
        {keyLayout[guesses.length][2].map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
            isTransparent={guesses.length === 5 && !isGameOver}
          />
        ))}
        {guesses.length % 2 === 0 || isGameOver ? (
          <Key width={65.4} value="DELETE" onClick={onClick}>
            {DELETE_TEXT}
          </Key>
        ) : (
          <Key width={65.4} value="ENTER" onClick={onClick}>
            {ENTER_TEXT}
          </Key>
        )}
      </div>
    </div>
  )
}
