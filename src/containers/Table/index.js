import { useContext } from "react";
import Context from "../../store/context";
import RoundHistory from "../../components/RoundHistory"
import "./index.scss"

const Table = () => {

    const { globalState } = useContext(Context);
    const { playerCards, crupierCards, currentBet, result, playerPoints, crupierPoints, finished, history, historyToggled, gameOver } = globalState;

    return (
        <div className="table">
        {currentBet ? (
            crupierCards.length < 2 && playerCards.length < 2 ? <div>Drawing cards...</div>
                 : (
                    <>
                        <div className="crupier">
                            {crupierCards.map((card, index) => {
                                if(index === 1 && finished) {
                                    return <img src={card.images.png} key={index} alt={`crupier_card_${index+1}`}/>
                                }
                                return <img src={card.image} key={index} alt={`crupier_card_${index+1}`}/>
                            })}
                            {finished ? <div className="points">Points: {globalState.crupierPoints}</div> : <div className="points">Points: ?</div>}
                        </div>
                        <div className="player">
                            {playerCards.map((card, index) => <img src={card.image} key={index} alt={`player_card_${index+1}`}/>)}
                            <div className="points">Points: {globalState.playerPoints}</div>
                        </div>
                        {finished && <div className="result">{`${result} - ${playerPoints} to ${crupierPoints}`}</div>}
                    </>
                 )
        ) : <div className="intro">Place bet to start a round</div>}
        {historyToggled && <RoundHistory data={history}/>}
        {gameOver && <div className="game-over">GAME OVER</div>}
        </div>
    )
}

export default Table;