import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../api/index";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [fistName, setFistName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const Navigate = useNavigate()

  async function Cadastrar(event) {
    event.preventDefault()
    if (fistName == null || lastName == null || email == null) {
      alert("Preencha todos os campos! ");
      return document.location.reload();
    } else if (password == null  || password.lenght < 4) {
      return alert("Senha muito curta");
    } else {
      await Api.post("user/cadastro", {
        params: {
          fistName: fistName,
          lastName: lastName,
          email: email,
          password: password,
        },
      })
        .then((response) => {
          if(response.data.status == 403){
            alert('Ja exite um usuario com esse email')
            return document.location.reload()
          }
          alert('Usuario criado! ')
          return Navigate('/')
        })
        .catch((erro) => {
          if(erro){
            alert('Ocorreu um erro inesperado')
            return document.location.reload()
          }
          console.log(erro);
        });
    }
  }

  return <AuthContext.Provider value={{
      Cadastrar, setFistName, setLastName, setEmail, setPassword
  }}>{children}</AuthContext.Provider>;
}
