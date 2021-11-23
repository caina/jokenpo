import {FunctionComponent} from "react";
import {Jokenpo} from "../../dto";
import './button.css'

type ButtonType = {
    onClick: () => void,
    icon?: Jokenpo,
    label?: string
}

export const Button: FunctionComponent<ButtonType> = ({icon, label, onClick, ...props}) => {
    return (
        <button onClick={e => onClick()} type="button" className={label ? "label-button" : "icon-button"} {...props}>
            {
                label ? label : (<img src={`/assets/${icon}`} alt=""/>)
            }
        </button>
    )
}