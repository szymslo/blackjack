import { useContext, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Interface from "./components/Interface";
import Table from "./components/Table";
import Context from "./store/context";

const App = () => {

  const { globalState, globalDispatch } = useContext(Context);

  const shuffleCards = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
      const json = await response.json();
      return json.deck_id;
    }
    catch(err) {
      console.log(err);
    }
  }

  const drawCards = async (amount) => {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${await shuffleCards()}/draw/?count=${amount}`);
      const json = await response.json();
      if(amount === 4) {
        globalDispatch({type: 'SET_CARDS', payload: json.cards});
      }
      if(amount === 1) {
        globalDispatch({type: 'ADD_ONE_CARD', payload: json.cards});
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(globalState.playerPoints === 21) {
      globalDispatch({type: "21"});
      setTimeout(() => globalDispatch({type: "CLEAR"}), 2000);
    }
    if(globalState.playerPoints > 21) {
      globalDispatch({type: "BUST"});
      setTimeout(() => globalDispatch({type: "CLEAR"}), 2000);
    }
    
  }, [globalState.playerPoints, globalDispatch])

  return (
    <div className="root">
      <Header/>
      <Table/>
      <Interface shuffle={shuffleCards} draw={drawCards}/>
    </div>
  );
};

export default App;
