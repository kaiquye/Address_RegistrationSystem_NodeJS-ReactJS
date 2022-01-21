import {useContext}  from 'react'
import { Navigate } from 'react-router-dom'
import {AuthContext} from '../../Context/ContextLogin/Login'

function PrivatePage({children, redirectTo}){

    const {authentication} = useContext(AuthContext)
    if(authentication){
        return children
    }else{
        //Use o Navigate no logar do useNavigate
        alert('Usuario deslogado')
        return <Navigate to={redirectTo}/>
    }
  
}

export default PrivatePage