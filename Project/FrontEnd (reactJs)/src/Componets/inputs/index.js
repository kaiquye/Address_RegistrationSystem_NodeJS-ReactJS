import './Style.css'
function Input(props){
    
    return(
        <input type={props.type} placeholder={props.placeholder || ' '}  onMouseOut={(e)=>props.onMouseOut(e.target.value)} onChange={(e)=>props.onChange(e.target.value)} value={props.value} />
    )
}

export default Input