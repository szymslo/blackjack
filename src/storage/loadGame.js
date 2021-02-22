const loadGame = () => {
    if(localStorage.getItem('gameSave')) {
        const rawState = localStorage.getItem('gameSave');
        const loadedState = JSON.parse(rawState);
        return loadedState;
    }
    return 'nosaves'
}

export default loadGame;