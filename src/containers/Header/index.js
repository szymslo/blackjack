import { useContext } from "react";
import Context from "../../store/context";
import "./index.scss"

const Header = ({save}) => {

    const { globalState, globalDispatch } = useContext(Context);
    const { historyToggled, rankingToggled } = globalState;

    return (
        <header className="menu">
            <button className={`nav-ranking${rankingToggled ? "-active" : ''}`} onClick={() => globalDispatch({type: 'TOGGLE_RANKING'})}>High Scores</button>
            <button className={`nav-history${historyToggled ? "-active" : ''}`} onClick={() => globalDispatch({type: 'TOGGLE_HISTORY'})}>Round History</button>
            <button className="nav-save" onClick={() => save(globalState)}>Save Game</button>
            <button className="nav-load" onClick={() => globalDispatch({type: 'LOAD_GAME'})}>Load Game</button>
            <button className="nav-reset" onClick={() => globalDispatch({type: 'RESET'})}>Reset Game</button>
        </header>
    )
}

export default Header;