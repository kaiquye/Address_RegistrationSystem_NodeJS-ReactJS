import { createContext, useState } from "react";
import Api from "../../../api";
export const AuthContext = createContext()

export function AuthContextProvider({children}){

    const [enderecos, setEnderecos] = useState(null)  //dps testar com os methodos asyc
    //IMPORTANTE !!!
    //SEMPRE QUE FOR PEGAR O LOCALSTORAGE, COLOCA-LO DENTRO DA FUNC QUE FOR CHAMADA
     function BuscarTodos(){ //tudo que estiver dentro dessa func sera executado na outra pagina, se estive fora não sera executa.

        const Token = localStorage.getItem('Token')
        const id = localStorage.getItem('id')

        console.log(Token)
        console.log(id)

       Api.get('address/'+id+'', {
            headers : {
                'Authorizantion' : Token
            }
        }).then((event)=>{
            setEnderecos(event.data.result)
            console.log(event.data.result)
        }).catch((erro)=>console.log(erro))
    }


    function Apagar(params){

        const Token = localStorage.getItem('Token')

        if(params != null || params != ''){
            Api.delete('address/'+params+'',{
                zipcode : 'zipcode',
                number : 'number',
                street : 'street',
                headers : {
                    'Authorizantion' : Token
                }
            }).then((event)=>{
                if(event.data.status == 200){
                    //recarregando os enderecos 
                    BuscarTodos()
                    alert('Endereço apagado.')
                }else if(event.data.status == 401){
                    alert('Esse endereço não existe no nosso banco de dados')
                    return document.location.reload()
                }
            }).catch((error)=>{
                alert('Aconteceu um erro inesperado')
                console.log(error)
            })
        }
    }
    return(
        <AuthContext.Provider value={{enderecos, Apagar, BuscarTodos}}>
            {children}
        </AuthContext.Provider>
    )
}