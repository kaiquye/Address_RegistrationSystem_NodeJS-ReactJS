import react from 'react'
import './Style.css'
function Ul (props){

    return(
        <>
          <ul>
              {props.children}
          </ul>
        </>
    )
}

export default Ul