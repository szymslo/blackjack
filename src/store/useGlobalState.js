
import {useReducer} from "react";

const reducer = (state, action) => {
    switch(action.type) {
        case "PLACE_BET":
            return {
                ...state,
                currentBet : action.payload,
                balance : state.balance - action.payload
            };
        default:
            return state;
    }
};

const useGlobalState = () => {
    const [globalState, globalDispatch] = useReducer(reducer, {
        balance: 1000,
        currentBet : null,
    })
    return {globalState, globalDispatch}
};

export default useGlobalState;