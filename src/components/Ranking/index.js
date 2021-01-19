import '../index.scss';

const Ranking = () => {

    if(localStorage.getItem('scores')) {
        const rawScores = localStorage.getItem('scores');
        const scores = JSON.parse(rawScores);
        scores.sort((a, b) => b - a);

        return (
            <div className="ranking">
                <ul>
                    {scores.map( (score,index) => {
                        if(index >= 5) {
                            return null;
                        }
                        return <li key={index}>{index+1}. {score} $</li>
                    })}
                </ul>
            </div>
        )
    }
    else {
        return <div className="ranking"/>
    }
}

export default Ranking