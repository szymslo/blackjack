import { useContext } from "react";
import Context from "../../store/context";
import "./index.css"

const Table = () => {

    const { globalState } = useContext(Context);
    const { playerCards, crupierCards, currentBet, result } = globalState;

    return (
        <div className="table">
        {currentBet ? (
            crupierCards.length < 2 && playerCards.length < 2 ? <div>Drawing cards...</div>
                 : (
                    <>
                        <div className="crupier">
                            {crupierCards.map((card, index) => <img src={card.image} key={index} alt={`crupier_card_${index+1}`}/>)}
                        </div>
                        <div className="player">
                            {playerCards.map((card, index) => <img src={card.image} key={index} alt={`player_card_${index+1}`}/>)}
                            <div className="points">Points: {globalState.playerPoints}</div>
                        </div>
                        {typeof result != undefined && <div className="result">{result}</div>}
                    </>
                 )
        ) : <div>Place bet to start a round</div>}
        </div>
    )
}

export default Table;