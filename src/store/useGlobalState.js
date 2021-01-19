import {useReducer} from "react";

const initialState = {
    balance: 1000,
    currentBet : null,
    isHit: false,
    isDoubled: false,
    finished: false,
    gameOver: false,
    crupierCards : [],
    playerCards : [],
    history: [],
    historyToggled: false,
    ranking: [],
    rankingToggled: false,
    playerPoints: 0,
    crupierPoints: 0,
    result: undefined
}

const countPoints = cards => {
    let points = 0;
    for(const card of cards) {
        switch(card.value) {
            case "ACE": {
                if(points + 11 > 21) {
                    points += 1;
                }
                else {
                    points += 11;
                }
                break;
            }
            case "KING": 
            case "QUEEN":
            case "JACK":      
            {
                points += 10;
                break;
            }

            case "10": {
                points += 10;
                break;
            }
            case "9": {
                points += 9;
                break;
            }
            case "8": {
                points += 8;
                break;
            }
            case "7": {
                points += 7;
                break;
            }
            case "6": {
                points += 6;
                break;
            }
            case "5": {
                points += 5;
                break;
            }
            case "4": {
                points += 4;
                break;
            }
            case "3": {
                points += 3;
                break;
            }
            case "2": {
                points += 2;
                break;
            }
            default: break;
        }
    }
    return points;
}

const reducer = (state, action) => {
    switch(action.type) {
        case "PLACE_BET":
            return {
                ...state,
                currentBet : action.payload,
                balance : state.balance - action.payload,
                result: undefined,
                finished: false
            };
        case "SET_CARDS":
            return {
                ...state,
                playerCards: action.payload.slice(2,4),
                crupierCards: action.payload.slice(0,2),
            }
        case "SET_POINTS":
            return {
                ...state,
                playerPoints: countPoints(state.playerCards),
                crupierPoints : countPoints(state.crupierCards)
            }
        case "ADD_ONE_CARD_PLAYER":
            return {
                ...state,
                playerCards: [...state.playerCards, ...action.payload]
            }
        case "ADD_ONE_CARD_CRUPIER":
            return {
                ...state,
                crupierCards: [...state.crupierCards, ...action.payload]
            }
        case "DOUBLE":
            return {
                ...state,
                isDoubled: true,
                balance : state.balance - state.currentBet,
                currentBet : state.currentBet * 2,
            }
        case "HIT":
            return {
                ...state,
                isHit: true
            }
        case "BUST":
            return {
                ...state,
                result: 'Lost (Bust)',
                finished: true
            }
        case "BLACKJACK":
            return {
                ...state,
                balance: state.balance + (state.currentBet * 1.5),
                result: 'Won (Blackjack)',
                finished: true
            }
        case "CHECK_RESULT":
            if(state.crupierPoints > 21) {
                return {
                    ...state,
                    balance: state.balance + (state.currentBet * 1.5),
                    result: 'Won (Dealer Bust)',
                    finished: true
                } 
            }
            else if(state.playerPoints > state.crupierPoints) {
                return {
                    ...state,
                    balance: state.balance + (state.currentBet * 1.5),
                    result: 'Won',
                    finished: true
                }
            }
            else if(state.playerPoints === state.crupierPoints) {
                return {
                    ...state,
                    balance: state.balance + state.currentBet,
                    result: 'Push',
                    finished: true
                }
            }
            else {
                return {
                    ...state,
                    result: 'Lost',
                    finished: true
                }
            }
        case "TOGGLE_HISTORY" : {
            return {
                ...state,
                historyToggled: !state.historyToggled
            }
        }
        case "TOGGLE_RANKING" : {
            return {
                ...state,
                rankingToggled: !state.rankingToggled
            }
        }
        case "CLEAR" : {
            return {
                ...state,
                history : [...state.history, [state.result, state.currentBet]],
                isHit: false,
                isDoubled: false,
                crupierCards : [],
                playerCards : [],
                playerPoints: 0,
                crupierPoints: 0,
                currentBet: null,
            }
        }
        case "RESET" : {
            return initialState;
        }
        case "END_GAME" : {
            return {
                ...state,
                gameOver: true
            }
        }
        default:
            return state;
    }
};

const useGlobalState = () => {
    const [globalState, globalDispatch] = useReducer(reducer, initialState)
    return {globalState, globalDispatch}
};

export default useGlobalState;