// returns true if crupier wants to draw a card
const crupierAI = cPoints => {
    if(cPoints < 17) {
        return true;
    }
    return false;
  }

export default crupierAI;