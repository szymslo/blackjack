import {useReducer} from "react";

const countPoints = (cards) => {
    let points = 0;
    for(const card of cards) {
        switch(card.value) {
            case "ACE": {
                points += 11;
                break;
            }
            case "KING": {
                points += 4;
                break;
            }
            case "QUEEN": {
                points += 3;
                break;
            }
            case "JACK": {
                points += 2;
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
                balance : state.balance - action.payload
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
                points: countPoints(state.playerCards)
            }
        default:
            return state;
    }
};

const useGlobalState = () => {
    const [globalState, globalDispatch] = useReducer(reducer, {
        balance: 1000,
        currentBet : null,
        crupierCards : [],
        playerCards : [],
        points: 0
    })
    return {globalState, globalDispatch}
};

export default useGlobalState;