import "./index.css"
import Button from "../../components/Button"

const Interface = () => {
    return (
        <div className="interface">
            <Button action="Hit"/>
            <Button action="Stand"/>
            <Button action="Double"/>
        </div>
    )
}

export default Interface;