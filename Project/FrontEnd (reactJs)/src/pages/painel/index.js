import Table from "../../Componets/table"
import './Style.css'
import {AuthContext}  from '../../Context/ContextPainel/Painel'
import {useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Container from "../../Componets/Container"
function Painel(){
    const {BuscarTodos, enderecos, Apagar} = useContext(AuthContext)
    const Navigate = useNavigate()
    useEffect(()=>{
        BuscarTodos()
    },[])
  

    return(
        <Container className='ContainerClass'>
                        <Container className='tituloPainelEndereços'>
                                 <h1>Todos endereços </h1>
                        </Container>

                        <Container className='tabeladeenderecos'>  
                            <Container className='tabela'>
                                {enderecos != null && 
                                <Table apagar={Apagar}  enderecos={enderecos}/>  
                            }
                            </Container>
                           
                    </Container>
                    <Container className='classButtonTabela'>
                                <button onClick={()=>Navigate('/painel-register')}>NOVO ENDEREÇO</button>
                                <button onClick={()=>Navigate('/painel-register')}>IMPRIMIR ENDEREÇOS</button>
                    </Container>
        </Container>
   
    )
}
export default Painel