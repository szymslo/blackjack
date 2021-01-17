import {useReducer} from "react";

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
                result: undefined
            };
        case "SET_CARDS":
            return {
                ...state,
                playerCards: action.payload.slice(2,4),
                crupierCards: action.payload.slice(0,2),
            }
        case "ADD_ONE_CARD":
            return {
                ...state,
                playerCards: [...state.playerCards, ...action.payload]
            }
        case "SET_POINTS":
            return {
                ...state,
                playerPoints: countPoints(state.playerCards),
                crupierPoints : countPoints(state.crupierCards)
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
        case "CHECK_RESULT":
            if(state.playerPoints > state.crupierPoints) {
                return {
                    ...state,
                    balance: state.balance + (state.currentBet * 1.5),
                    result: 'Won'
                }
            }
            else {
                return {
                    ...state,
                    result: 'Lost'
                }
            }
        case "BUST": {
            return {
                ...state,
                result: 'Bust'
            } 
        }
        case "21" : {
            return {
                ...state,
                balance: state.balance + (state.currentBet * 1.5),
                result: 'Won'
            }
        }
        case "CLEAR" : {
            return {
                ...state,
                currentBet: null,
                crupierCards : [],
                playerCards : [],
                playerPoints: 0,
                crupierPoints: 0,
            }

        }
            
        default:
            return state;
    }
};

const useGlobalState = () => {
    const [globalState, globalDispatch] = useReducer(reducer, {
        balance: 1000,
        currentBet : null,
        isHit: false,
        finished: false,
        crupierCards : [],
        playerCards : [],
        playerPoints: 0,
        crupierPoints: 0,
        result: undefined
    })
    return {globalState, globalDispatch}
};

export default useGlobalState;