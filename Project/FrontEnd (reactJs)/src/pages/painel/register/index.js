import { useContext, useState } from "react";
import { AuthContext } from "../../../Context/ContextPainel/Register";
import Formulario from "../../../Componets/formulario";
import Input from "../../../Componets/inputs";
import Button from "../../../Componets/button";
import Label from "../../../Componets/label";
import axios from "axios";
import Container from "../../../Componets/Container";
import './Style.css'
function RegisterAddress (){
    const {Cadastrar, setZicpde, setNumber, setStreet} = useContext(AuthContext);

    
const [zipC, setZipc] = useState();
const [stre, setStret] = useState();
const [complemento, setComplemento] = useState()
const [bairro, setBairro] = useState()
const [uf, setUf] = useState()
const [ibge, setIbge] = useState()

function ViaCep(number){

    if(number){
        axios({
            method : 'GET',
            url : 'https://viacep.com.br/ws/'+number+'/json/'
        }).then((e)=>{
            console.log(e)
            setZipc(e.data.localidade)
            setStret(e.data.logradouro)
            setComplemento(e.data.complemento)
            setBairro(e.data.bairro)
            setUf(e.data.uf)
            setIbge(e.data.ibge)
            setZicpde(e.data.localidade)
            setStreet(e.data.logradouro)
        }).catch((err)=>{
            alert('Erro, não foi possivel pesquisa por este endereço')
            setNumber(null)
        })
     }
}

    return(
        <>
        <Container className='FormulariodeCadastroEndereco'>
                <Container className='divFormEndereco'>
                    <h1>Novo endereço</h1>
                        <Formulario submit={Cadastrar}>
                            <Label>Cep :</Label>
                            <Input type='number' placeholder={'Ex: Cep'} onMouseOut={ViaCep} onChange={setNumber}/>
                            <Label>Logradouro :</Label>
                            <Input type='text' placeholder={'Ex: Estado'} value={zipC} />
                            <Label>Complemento :</Label>
                            <Input type='text' placeholder={'Ex: Complemento'} value={complemento} />
                            <Label>Bairro :</Label>
                            <Input type='text' placeholder={'Ex: Bairro'} value={bairro}   />
                            <Label>UF :</Label>
                            <Input type='text' placeholder={'Ex: UF'} value={uf} />
                            <Label>Ibge :</Label>
                            <Input type='text' placeholder={'Ex: Ibge'} value={ibge}  />
                            <Button>Salvar</Button>
                    </Formulario>
                </Container>
        </Container>
        </>
    )
}

export default RegisterAddress