import Label from "../../../Componets/label"
import Input from "../../../Componets/inputs"
import Button from "../../../Componets/button"
import Container from "../../../Componets/Container"
import './Style.css'
import { useContext } from "react"
import { AuthContext } from '../../../Context/ContextLogin/Login'

function Login(){
    const {setLogin, setPassword, AuthenticationUser, RediretTO} = useContext(AuthContext)
    return(
        <div>
            
            <Container className='mensagem'>
                <h1>ViaCep</h1>
                <h5>Cadastro de endereços</h5>
            </Container>

            <form  className="formularioLogin" onSubmit={(event)=>AuthenticationUser(event)}>
                <div>
                    <Label>Login :</Label>
                    <Input type={'text'} placeholder={'Login'} onChange={setLogin} />
                </div>
                <div>
                    <Label>Password :</Label>
                    <Input  type={'password'} placeholder={'Password'} onChange={setPassword} />
                </div>
                <div className="divButtonLogin">
                     <Button>Logar</Button>
                     <Button click={()=>RediretTO('/register')} >Cadastrar</Button>
                </div>
            </form>
        </div>
    )
}
export default Login