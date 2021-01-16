import { useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import Interface from "./components/Interface";
import Table from "./components/Table";
import Context from "./store/context";

const App = () => {

  const { globalDispatch } = useContext(Context);

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

  const drawCards = async () => {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${await shuffleCards()}/draw/?count=4`);
      const json = await response.json();
      console.log(json.cards);
      globalDispatch({type: 'SET_CARDS', payload: json.cards});
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="root">
      <Header/>
      <Table/>
      <Interface shuffle={shuffleCards} draw={drawCards}/>
    </div>
  );
};

export default App;
