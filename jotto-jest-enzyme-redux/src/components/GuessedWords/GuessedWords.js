import React from 'react'
import PropTypes from 'prop-types'

const GuessedWords = props => {
  const { guessedWords } = props
  let contents

  if (Array.isArray(guessedWords) && !guessedWords.length) {
    contents = <h5 data-test="guess-instructions">Try to guess the secret word!</h5>
  } else {
    const guessedWordsRows = guessedWords.map((word, idx) => (
      <tr data-test="guessed-word" key={idx}>
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ))
    contents = (
      <div data-test="guessed-words">
        <h3>Guessed Words</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>Guess</th>
              <th>Matching Letters</th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
      </div>
    )
  }

  return <div data-test="component-guessed-words">{contents}</div>
}

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default GuessedWords
