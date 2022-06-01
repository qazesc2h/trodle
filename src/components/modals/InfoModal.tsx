import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Guess the word in 6 tries.{' '}
        <b>
          <u>A</u>
        </b>
        fter each guess, the color of the tiles will cha
        <b>
          <u>n</u>
        </b>
        ge to{' '}
        <b>
          <u>s</u>
        </b>
        how ho
        <b>
          <u>w</u>
        </b>{' '}
        clos
        <b>
          <u>e</u>
        </b>{' '}
        you
        <b>
          <u>r</u>
        </b>{' '}
        guess was to the word.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="W"
          status="correct"
        />
        <Cell value="E" />
        <Cell value="A" />
        <Cell value="R" />
        <Cell value="Y" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter W is in the word and in the correct spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="P" />
        <Cell value="I" />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="L"
          status="present"
        />
        <Cell value="O" />
        <Cell value="T" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter L{' '}
        <b>
          <u>is</u>
        </b>{' '}
        in the word but in the wrong spot.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="V" />
        <Cell value="A" />
        <Cell value="G" />
        <Cell isRevealing={true} isCompleted={true} value="U" status="absent" />
        <Cell value="E" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter U is not in the word in any spot.
      </p>

      <p className="mt-6 italic text-sm text-gray-500 dark:text-gray-300">
        <b>
          <u>T</u>
        </b>
        his is an open sou
        <b>
          <u>r</u>
        </b>
        ce versi
        <b>
          <u>o</u>
        </b>
        n of the word guessing game we a
        <b>
          <u>l</u>
        </b>
        l know and{' '}
        <b>
          <u>l</u>
        </b>
        ove -{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline font-bold"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
