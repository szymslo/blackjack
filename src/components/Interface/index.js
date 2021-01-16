import { useContext } from "react";
import Context from "../../store/context";
import "./index.scss";

const actions = ['Hit', 'Stand', 'Double'];
const bets = [5,10,25,50,100];

const Interface = ({draw}) => {
  const { globalState, globalDispatch } = useContext(Context);

  return (
    <>
      <div className="interface">
        {globalState.currentBet ? (
          <>
            <div className="buttons">
              {actions.map(act => <button key={act} className="btn-action">{act}</button>)}
            </div>
          </>
        ) : (
          <div className="buttons">
            {bets.map(bet => <button key={bet} className={`btn-bet-${bet}`} onClick={async () => {
              globalDispatch({type: 'PLACE_BET', payload: bet});
              await draw();
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
