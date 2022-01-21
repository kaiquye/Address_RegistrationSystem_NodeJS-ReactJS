import react from 'react'
import './Style.css'
function Button (props){
    return(
        <button type={props.type} onClick={()=>props.click()}>
            {props.children}
        </button>
    )
}

export default Button