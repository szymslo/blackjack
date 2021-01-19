import './index.css';

const RoundHistory = ({data}) => {
    return (
        <div className="history">
            <ul>
                {data.map( (item,index) => <li key={index}>{`${index+1}. ${item[0]}: Bet - ${item[1]}$`}</li>)}
            </ul>
        </div>
    )
}

export default RoundHistory;