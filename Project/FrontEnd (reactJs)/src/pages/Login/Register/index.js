import Label from "../../../Componets/label";
import Input from "../../../Componets/inputs";
import Button from "../../../Componets/button";
import Formulario from "../../../Componets/formulario";
import './Style.css'
import { useContext } from "react";
import { AuthContext } from "../../../Context/ContextLogin/Register";
import Container from "../../../Componets/Container";
function Register() {
  const { Cadastrar, setFistName, setLastName, setEmail, setPassword } = useContext(AuthContext);

  return (
           <Container className='FormCadastroUsuario'>
              <h1>Registro de usuário :</h1>
                          <Formulario  submit={Cadastrar}>
                          <Container>
                            <Label>Nome : </Label>
                            <Input type="text" placeholder={"Nome"} onChange={setFistName} />
                          </Container>
                          <Container>
                          <Label>Sobrenome : </Label>
                            <Input
                              type="text"
                              placeholder={"Sobrenome"}
                              onChange={setLastName}
                            />
                          </Container>
                          <Container>
                            <Label>Email : </Label>
                            <Input type="email" placeholder={"Email"} onChange={setEmail} />
                          </Container>
                           <Container>
                             <Label>Senha : </Label>
                            <Input type="password" placeholder={"Senha"} onChange={setPassword} />
                           </Container>
                           <Container>
                             <Button>Salvar</Button>
                           </Container>
                        </Formulario>
              </Container>
  );
}
export default Register;
