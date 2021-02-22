import { useContext, useEffect, useState } from "react";
import Header from "./containers/Header";
import Interface from "./containers/Interface";
import Table from "./containers/Table";
import Context from "./store/context";
import crupierAI from "./utility/crupierAI"
import drawCards from "./utility/drawCards";
import shuffleCards from "./utility/shuffleCards";
import saveGame from "./storage/saveGame"
import saveRanking from "./storage/saveRanking"
import "./App.css";

const App = () => {

  const { globalState, globalDispatch } = useContext(Context);
  const [deck, setDeck] = useState(undefined);

  //prompt on window close
  useEffect(() => {
    window.addEventListener("beforeunload", e => {
      saveGame(globalState);
      e.preventDefault();
      return e.returnValue = 'Game has been saved';
    });
  })
  
  useEffect(() => { 
    (async () => {
      const returnedDeck = await shuffleCards();
      setDeck(returnedDeck);
    })()
  }, [])

  //watch if points hit or exceed 21
  useEffect(() => {
    if(globalState.playerPoints === 21) {
      globalDispatch({type: "BLACKJACK"});
      setTimeout(() => globalDispatch({type: "CLEAR"}), 3000);
    }
    if(globalState.playerPoints > 21) {
      globalDispatch({type: "BUST"});
      setTimeout(() => globalDispatch({type: "CLEAR"}), 3000);
    }
  }, [globalState.playerPoints, globalDispatch])

  //end game on 5 rounds
  useEffect(() => {
    if(globalState.history.length > 4) {
      globalDispatch({type: "END_GAME"});
      saveRanking(globalState.balance);
      setTimeout(() => globalDispatch({type: "RESET"}), 3000);
    }
  }, [globalState.history, globalState.balance, globalDispatch])
  
  return (
    <div className="root">
      <Header save={saveGame}/>
      <Table/>
      <Interface draw={drawCards} autoCrupier={crupierAI} deck={deck}/>
    </div>
  );
};

export default App;
