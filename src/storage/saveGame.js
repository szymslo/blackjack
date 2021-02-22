const saveGame = (gameState) => {
    localStorage.setItem('gameSave', JSON.stringify(gameState));
  }

export default saveGame;