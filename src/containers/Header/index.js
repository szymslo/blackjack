import { useContext } from "react";
import Context from "../../store/context";
import "./index.scss"

const Header = () => {

    const { globalState, globalDispatch } = useContext(Context);

    return (
        <header className="menu">
            <button className="nav-ranking">Ranking</button>
            <button className="nav-history" onClick={() => globalDispatch({type: 'TOGGLE_HISTORY'})}>Round History</button>
            <button className="nav-save">Save Game</button>
            <button className="nav-load">Load Game</button>
            <button className="nav-reset" onClick={() => globalDispatch({type: 'RESET'})}>Reset Game</button>
        </header>
    )
}

export default Header;