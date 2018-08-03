import React from 'react';
import {connect} from 'react-redux';

import Header from './header';
import GuessSection from './guess-section';
import StatusSection from './status-section';
import InfoSection from './info-section';

import { newGame, makeGuess, getAuralUpdate } from '../actions';

export class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  newGame() {
     const correctAnswer = Math.floor(Math.random() * 100) + 1;
     this.props.dispatch(newGame(correctAnswer));
  }

  makeGuess(guess) {
    this.props.dispatch(makeGuess(guess));
  }

  getAuralUpdate() {
    this.props.dispatch(getAuralUpdate());
  }

  render() {
    const { feedback, guesses, auralStatus } = this.props;
    const guessCount = guesses.length;

    return (
      <div>
        <Header
          onRestartGame={() => this.newGame()}
          onGenerateAuralUpdate={() => this.getAuralUpdate()}
        />
        <main role="main">
          <GuessSection
            feedback={feedback}
            guessCount={guessCount}
            onMakeGuess={guess => this.makeGuess(guess)}
          />
          <StatusSection guesses={guesses} 
            auralStatus={auralStatus}
          />
          <InfoSection />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  guesses: state.guesses,
  feedback: state.feedback,
  auralStatus: state.auralStatus,
  correctAnswer: state.correctAnswer
});

export default connect(mapStateToProps)(Game);
