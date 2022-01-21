import react from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../../src/Context/ContextLogin/Login/index'
import Button from '../button/index'
import './Style.css'
import Ul from '../ul'
import Li from '../ul/li'
import Container from '../Container/index'
import Label from '../label'

function NavBar(){
    const {Logoff} = useContext(AuthContext)
    return(
        <header className='Teste'>
            <Container className='Container'>
                 <Container className='logo'>
                     <Label>
                         ViaCep
                     </Label>
                 </Container>
                 <Container className='lista'>
                    <Ul>
                        <Li>
                        <Link to='/painel-register'>Novo enderecos</Link>
                        </Li>
                        <Li>
                            <Link to='/painel'>Todos enderecos</Link>
                        </Li>
                        <Li> 
                            <Button className='ButtonLogoffNavBar' click={Logoff}>Logoff</Button>
                        </Li>
                    </Ul>
                 </Container>
            </Container>

        </header>
    )
}

export default NavBar