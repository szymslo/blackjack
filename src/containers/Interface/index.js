import { useContext } from "react";
import Context from "../../store/context";
import "./index.scss";

const bets = [5,10,25,50,100];

const Interface = ({draw, autoCrupier, deck}) => {

  const { globalState, globalDispatch} = useContext(Context);

  const assignCards = (cards, target) => {
    if(cards.length === 4 && target === 'both') {
      cards[1].image = './back.png';
      globalDispatch({type: 'SET_CARDS', payload: cards});
    }
    if(cards.length === 1 && target === 'player') {
      globalDispatch({type: 'ADD_ONE_CARD_PLAYER', payload: cards});
    }
    if(cards.length === 1 && target === 'crupier') {
      globalDispatch({type: 'ADD_ONE_CARD_CRUPIER', payload: cards});
    }
  }

  return (
    <>
      <div className="interface">
        {globalState.currentBet ? (
          <div className="buttons">
              <button className="btn-action" onClick={async () => {
                if(!globalState.isHit && !globalState.isDoubled) {
                  globalDispatch({type: "DOUBLE"});
                  assignCards(await draw(deck,1), 'player')
                  if(autoCrupier) {
                    assignCards(await draw(deck,1), 'crupier')
                  }
                  globalDispatch({type: "SET_POINTS"});
                  globalDispatch({type: "CHECK_RESULT"});
                  setTimeout(() => globalDispatch({type: "CLEAR"}), 3000);
                }
                else {
                  alert (`Can't double now`);
                }
              }}>Double</button>
              <button className="btn-action" onClick={async () => {
                if(!globalState.isDoubled) {
                  globalDispatch({type: "HIT"});
                  assignCards(await draw(deck,1), 'player')
                  globalDispatch({type: "SET_POINTS"});
                }
                else {
                  alert (`Can't hit now`);
                }
              }}>Hit</button>
              <button className="btn-action" onClick={async () => {
                if(autoCrupier) {
                  assignCards(await draw(deck,1), 'crupier')
                }
                globalDispatch({type: "SET_POINTS"});
                globalDispatch({type: "CHECK_RESULT"});
                setTimeout(() => globalDispatch({type: "CLEAR"}), 3000);
              }}>Stand</button>
          </div>
        ) : (
          <div className="buttons">
            {bets.map(bet => <button key={bet} className={`btn-bet-${bet}`} onClick={async () => {
              globalDispatch({type: 'PLACE_BET', payload: bet});
              assignCards(await draw(deck,4), 'both');
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
