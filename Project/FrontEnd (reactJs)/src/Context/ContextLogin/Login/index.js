import {createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Api from "../../../api";
export const  AuthContext = createContext()
export function AutoContextProvider({children}){

    const Navigate = useNavigate()
    const [user, setUser] = useState(null); //id do usuario
    const [login, setLogin] = useState(null) //pegando os valores do components e salvando neste state temporariamente
    const [password, setPassword] = useState(null) 

    useEffect(()=>{
        Logoff()
    },[])
    
    function Logoff(){
        console.log('logoff')
        setUser(null)
    }
    function RediretTO(to){
        return Navigate(to)
    }
  async function AuthenticationUser(event){
        event.preventDefault();
        if(login == null || password == null){
            alert('Preenchar todos os campos')
            return document.location.reload()
        }else{
            await Api.post('user/login', {
                    fistName : login,
                    password : password
                }).then((events)=>{
                    if(events.data.status == 401 ){
                        alert('Usuario invalido')
                       return document.location.reload()
                    }
                    setUser(events.data.User.id);
                    const id = events.data.User.id
                    localStorage.setItem('id', id)
                    const Token = events.data.Token
                    localStorage.setItem('Token', Token)
                    console.log('idlocal')
                    console.log(localStorage.getItem('id'))
                    return Navigate('/painel')
                }).catch((erro)=>{
                    alert('Aconteceu um erro inesperado.')
                    console.log(erro)
                    return document.location.reload()
                })
        }
    }
    return(
        <AuthContext.Provider value={{authentication : Boolean(user), RediretTO ,AuthenticationUser, setPassword, Logoff, setLogin}}>
            {children}
        </AuthContext.Provider>
    )
}