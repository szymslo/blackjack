const drawCards = async (deck, amount) => {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=${amount}`);
      const json = await response.json();
      return json.cards;
    }
    catch(err) {
      console.log(err);
    }
  }

export default drawCards;