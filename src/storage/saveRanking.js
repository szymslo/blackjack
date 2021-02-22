const saveRanking = (balance) => {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(balance);
    localStorage.setItem('scores', JSON.stringify(scores));
  }

export default saveRanking;