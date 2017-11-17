import reducer from './reducer';
import { newGame, makeGuess, toggleInfoModal } from './actions';

describe('Hot/Cold game reducer', () => {
    it('should set initial state', () => {
        const state = reducer(undefined, { type: '__UNKNOWN' });

        expect(state.guesses).toEqual([]);
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
        expect(state.feedback).toEqual('Make your guess!');
        expect(state.showInfoModal).toEqual(false);
    });

    it('should return current state on unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, { type: '__UNKNOWN' });
        expect(state).toBe(currentState);
    });
});

describe('newGame', () => {
    it('should make new game when called', () => {
        let state = {
            guesses: [60, 34, 6, 19],
            feedback: 'Testy test test',
            correctAnswer: -1
        };
        state = reducer(state, newGame());
        expect(state.guesses).toEqual([]);
        expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(state.correctAnswer).toBeLessThanOrEqual(100);
        expect(state.feedback).toEqual('Make your guess!');
    });
});

describe('makeGuess', () => {
    it('should make a guess', () => {
        let state = {
            guesses: [],
            feedback: '',
            correctAnswer: 50
        };
        state = reducer(state, makeGuess(0));
        expect(state.guesses).toEqual([0]);
        expect(state.feedback).toEqual('You\'re Ice Cold...')

        state = reducer(state, makeGuess(20));
        expect(state.guesses).toEqual([0, 20]);
        expect(state.feedback).toEqual('You\'re Cold...');

        state = reducer(state, makeGuess(40));
        expect(state.guesses).toEqual([0, 20, 40]);
        expect(state.feedback).toEqual('You\'re Warm');

        state = reducer(state, makeGuess(49));
        expect(state.guesses).toEqual([0, 20, 40, 49]);
        expect(state.feedback).toEqual('You\'re Hot!');

        state = reducer(state, makeGuess(50));
        expect(state.guesses).toEqual([0, 20, 40, 49, 50]);
        expect(state.feedback).toEqual('You got it!');
    });
});

describe('toggle Info Modal', () => {
    it('should toggle the modal on', () => {
        let state = {
            showInfoModal: false
        };
        state = reducer(state, toggleInfoModal());
        expect(state.showInfoModal).toBe(true);
    });

    it('should toggle modal off', () => {
        let state = {
            showInfoModal: true
        };
        state = reducer(state, toggleInfoModal());
        expect(state.showInfoModal).toBe(false);
    });
});