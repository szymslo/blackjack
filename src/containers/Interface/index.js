import { useContext } from "react";
import Context from "../../store/context";
import "./index.scss";

const Interface = () => {
  const { globalState, globalDispatch } = useContext(Context);

  return (
    <>
      <div className="interface">
        {globalState.currentBet ? (
          <>
            <div className="buttons">
              <button className="btn-action">Hit</button>
              <button className="btn-action">Stand</button>
              <button className="btn-action">Double</button>
            </div>
          </>
        ) : (
          <div className="buttons">
            <button className="btn-bet-5" onClick={() => globalDispatch({type: 'PLACE_BET', payload: 5})}>$ 5</button>
            <button className="btn-bet-10" onClick={() => globalDispatch({type: 'PLACE_BET', payload: 10})}>$ 10</button>
            <button className="btn-bet-25" onClick={() => globalDispatch({type: 'PLACE_BET', payload: 25})}>$ 25</button>
            <button className="btn-bet-50" onClick={() => globalDispatch({type: 'PLACE_BET', payload: 50})}>$ 50</button>
            <button className="btn-bet-100" onClick={() => globalDispatch({type: 'PLACE_BET', payload: 100})}>$ 100</button>
          </div>
        )}
        <div className="balance">
          <span className="cash">Cash: ${globalState.balance}</span>
          {globalState.currentBet && <span className="bet">Bet: ${globalState.currentBet}</span>}
        </div>
      </div>
    </>
  );
};

export default Interface;
