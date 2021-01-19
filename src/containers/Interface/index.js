import { useContext } from "react";
import Context from "../../store/context";
import "./index.scss";

const bets = [5,10,25,50,100];

const Interface = ({draw, autoCrupier}) => {
  const { globalState, globalDispatch } = useContext(Context);

  return (
    <>
      <div className="interface">
        {globalState.currentBet ? (
          <div className="buttons">
              <button className="btn-action" onClick={async () => {
                if(!globalState.isHit && !globalState.isDoubled) {
                  globalDispatch({type: "DOUBLE"});
                  await draw(1,'player');
                  await autoCrupier(globalState.crupierPoints);
                  globalDispatch({type: "SET_POINTS"});
                  //globalDispatch({type: "CHECK_RESULT"});
                  //setTimeout(() => globalDispatch({type: "CLEAR"}), 3000);
                }
                else {
                  alert (`Can't double now`);
                }
              }}>Double</button>
              <button className="btn-action" onClick={async () => {
                if(!globalState.isDoubled) {
                  globalDispatch({type: "HIT"});
                  await draw(1,'player');
                  globalDispatch({type: "SET_POINTS"});
                }
                else {
                  alert (`Can't hit now`);
                }
              }}>Hit</button>
              <button className="btn-action" onClick={async () => {
                await autoCrupier(globalState.crupierPoints);
                globalDispatch({type: "SET_POINTS"});
                globalDispatch({type: "CHECK_RESULT"});
                setTimeout(() => globalDispatch({type: "CLEAR"}), 3000);
              }}>Stand</button>
          </div>
        ) : (
          <div className="buttons">
            {bets.map(bet => <button key={bet} className={`btn-bet-${bet}`} onClick={async () => {
              globalDispatch({type: 'PLACE_BET', payload: bet});
              await draw(4);
              globalDispatch({type: 'SET_POINTS'});
            }}
            >{bet}</button>)}
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
