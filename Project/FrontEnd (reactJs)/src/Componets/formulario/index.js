
import react from 'react'

function Formulario(props){
    return(
        <form className={props.className} onSubmit={(event)=>props.submit(event)}>
            {props.children}
        </form>
    )
}
export default Formulario