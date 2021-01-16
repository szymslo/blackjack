import { useContext } from "react";
import Context from "../../store/context";
import "./index.css"

const Table = () => {

    const { globalState } = useContext(Context);
    const { playerCards, crupierCards } = globalState;

    return (
        <div className="table">
                {crupierCards.length > 0 ? (
                    <div className="crupier">
                        <img src={crupierCards[0].image} alt='crupier_card_1'/>
                        <img src={crupierCards[1].image} alt='crupier_card_2'/>
                    </div>
                ) : <p>...</p>}
                {playerCards.length > 0 ? (
                    <div className="player">
                        <img src={playerCards[0].image} alt='player_card_1'/>
                        <img src={playerCards[1].image} alt='player_card_2'/>
                        <div className="points">Points: {globalState.points}</div>
                    </div>
                ) : <p>...</p>}
        </div>
    )
}

export default Table;