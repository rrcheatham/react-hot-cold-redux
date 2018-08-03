import * as actions from '../actions';

const initialState = {
    guesses: [],
    feedback: 'Make your guess!',
    auralStatus: '',
    correctAnswer: Math.round(Math.random() * 100) + 1
};

export const hotColdReducer = (state=initialState, action) => {
    if (action.type === actions.NEW_GAME) {
        return Object.assign({}, state, {
            guesses: [],
            feedback: 'Make your guess!',
            auralStatus: '',
            correctAnswer: action.correctAnswer
        });

    } else if (action.type === actions.MAKE_GUESS) {
        let guess = action.guess;
        let feedback;
        const difference = Math.abs(guess - state.correctAnswer);

        if (isNaN(guess)) {
            feedback = 'Please enter a valid number'
            return Object.assign({}, state, {
                feedback,
                guesses: [...state.guesses]
            });
        }
          if (difference >= 50) {
            feedback = 'You\'re Ice Cold...';
          } else if (difference >= 30) {
            feedback = 'You\'re Cold...';
          } else if (difference >= 10) {
            feedback = 'You\'re Warm.';
          } else if (difference >= 1) {
            feedback = 'You\'re Hot!';
          } else {
            feedback = 'You got it!';
          }
        return Object.assign({}, state, {
            feedback: feedback,
            guesses: [...state.guesses, guess]
        });

    } else if (action.type === actions.GET_AURAL_UPDATE) {
        const pluralize = state.guesses.length !== 1;
        let  auralStatus = `Here's the status of the game right now: ${state.feedback} You've made ${state.guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;
    
        if (state.guesses.length > 0) {
          auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${state.guesses.reverse().join(', ')}`;
        }
        
        return Object.assign({}, state, {
            auralStatus
        });
    }
    return state;
};
