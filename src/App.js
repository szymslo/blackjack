import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./containers/Header";
import Interface from "./containers/Interface";
import Table from "./containers/Table";
import Context from "./store/context";

const App = () => {

  const { globalState, globalDispatch } = useContext(Context);
  const [deck, setDeck] = useState(undefined);
  
  useEffect(() => {
    shuffleCards();
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

  useEffect(() => {
    if(globalState.history.length > 4) {
      globalDispatch({type: "END_GAME"});
      setTimeout(() => globalDispatch({type: "RESET"}), 3000);
    }
  }, [globalState.history, globalDispatch])  

  const shuffleCards = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
      const json = await response.json();
      setDeck(json.deck_id);
    }
    catch(err) {
      console.log(err);
    }
  }

  const drawCards = async (amount, target) => {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=${amount}`);
      const json = await response.json();
      if(amount === 4) {
        json.cards[1].image = './back.png';
        globalDispatch({type: 'SET_CARDS', payload: json.cards});
      }
      if(amount === 1 && target === 'player') {
        globalDispatch({type: 'ADD_ONE_CARD_PLAYER', payload: json.cards});
      }
      if(amount === 1 && target === 'crupier') {
        globalDispatch({type: 'ADD_ONE_CARD_CRUPIER', payload: json.cards});
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  //extremely advanced automated dealer artificial intelligence
  const crupierAI = async (cPoints) => {
    if(cPoints < 18) {
        await drawCards(1, 'crupier');
      }
  }

  return (
    <div className="root">
      <Header/>
      <Table/>
      <Interface draw={drawCards} autoCrupier={crupierAI}/>
    </div>
  );
};

export default App;
