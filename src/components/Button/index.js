import "./index.css"

const Button = ({action}) => {
    return (
        <button className="action">
        {action}
        </button>
    )
}

export default Button;