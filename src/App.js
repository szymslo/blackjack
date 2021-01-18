import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Interface from "./components/Interface";
import Table from "./components/Table";
import Context from "./store/context";

const App = () => {

  const { globalState, globalDispatch } = useContext(Context);
  const [deck, setDeck] = useState(undefined);

  useEffect(() => {
    shuffleCards();
  }, [])

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
        console.log(json.cards);
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

  //watch if points hit or exceed 21
  useEffect(() => {
    if(globalState.playerPoints === 21) {
      globalDispatch({type: "21"});
      setTimeout(() => globalDispatch({type: "CLEAR"}), 5000);
    }
    if(globalState.playerPoints > 21) {
      globalDispatch({type: "BUST"});
      setTimeout(() => globalDispatch({type: "CLEAR"}), 5000);
    }
    if(globalState.crupierPoints > 21) {
      globalDispatch({type: "DEALER BUST"});
      setTimeout(() => globalDispatch({type: "CLEAR"}), 5000);
    }
    
  }, [globalState.playerPoints, globalState.crupierPoints, globalDispatch])

  return (
    <div className="root">
      <Header/>
      <Table/>
      <Interface draw={drawCards} autoCrupier={crupierAI}/>
    </div>
  );
};

export default App;
