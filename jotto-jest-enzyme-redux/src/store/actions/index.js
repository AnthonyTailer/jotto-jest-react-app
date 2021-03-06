import axios from 'axios'
import { getLetterMathCount } from '../../helpers'

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
}

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action and (conditionally) CORRECT_GUESS action
 * @function guessWord
 * @param {string} guessedWord - Guessed word.
 * @returns {function} - Redux Thunk function.
 * */
export const guessWord = guessedWord => (dispatch, getState) => {
  const { secretWord } = getState()
  const letterMatchCount = getLetterMathCount(guessedWord, secretWord)

  dispatch({
    type: actionTypes.GUESS_WORD,
    payload: { guessedWord, letterMatchCount },
  })

  if (guessedWord === secretWord) {
    dispatch({ type: actionTypes.CORRECT_GUESS })
  }
}

export const getSecretWord = () => dispatch =>
  axios.get('https://random-word-api.herokuapp.com/word').then(response => {
    const [secretWord] = response.data
    dispatch({
      type: actionTypes.SET_SECRET_WORD,
      payload: secretWord,
    })
  })
