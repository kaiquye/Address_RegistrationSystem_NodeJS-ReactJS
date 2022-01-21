import { createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import Api  from '../../../api/index'
export const AuthContext = createContext()

export function  AuthContextProvider({children}){
    const Navigate = useNavigate()
    const [zipcode, setZicpde] = useState(null)
    const [number, setNumber] = useState(null)
    const [street, setStreet] = useState(null)

    async function Cadastrar(event){
        //sempre que buscar algo no localstorage colocar dentro da function para ser recarregado
        let id = localStorage.getItem('id')
        let Token = localStorage.getItem('Token')
        console.log(zipcode, number, street)
        console.log(Token)
        event.preventDefault();
        if(zipcode == null || number == null || street == null){
            alert('Preencha todos os campos')
            return document.location.reload()
        }
            console.log(zipcode, number, street)
            console.log(Token)
            Api.post('address/'+id+'',{
                zipcode,
                number, 
                street
            },{
                headers : {
                    'Authorizantion' : Token
                }
            }).then((response)=>{
                if(response.data.status == 200){
                    alert('Endereco cadastrado')
                    return Navigate('/painel')
                }
            }).catch((erro)=>{
                console.log(erro)
            })
    }
    return(
        <AuthContext.Provider value={{Cadastrar, setZicpde, setNumber, setStreet}}>
            {children}
        </AuthContext.Provider>
    )
}