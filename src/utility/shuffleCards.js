const shuffleCards = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
      const json = await response.json();
      return json.deck_id
    }
    catch(err) {
      console.log(err);
    }
  }

  export default shuffleCards;