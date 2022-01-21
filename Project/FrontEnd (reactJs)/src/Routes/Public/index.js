import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AutoContextProvider as ContextLogin } from '../../Context/ContextLogin/Login'
import { AuthContextProvider as ContextAddress } from '../../Context/ContextPainel/Painel'
import { AuthContextProvider  as ContextLoginRegister } from '../../Context/ContextLogin/Register'
import { AuthContextProvider as ContextAddressRegister } from '../../Context/ContextPainel/Register'
import Register from '../../pages/Login/Register'
import PrivatePage from '../Private'
import Painel from '../../pages/painel'
import Login from '../../pages/Login/Login'
import  RegisterAddress from '../../pages/painel/register/index'
import NavBar from '../../Componets/navBar'
function MyRoutes(){
    return(
        <BrowserRouter>
                    <ContextLogin>
                        <ContextAddress>
                            <ContextLoginRegister>
                                <ContextAddressRegister>
                                    <NavBar/>
                                    <Routes>
                                        <Route path='/' element={<Login/>}/>
                                        <Route path='/register' element={<Register/>} />
                                        <Route path='/painel' element={<PrivatePage redirectTo='/'> <Painel/> </PrivatePage>}/>
                                        <Route path='/painel-register' element={<PrivatePage redirectTo='/'> <RegisterAddress/> </PrivatePage>}/>
                                    </Routes>
                                </ContextAddressRegister>
                            </ContextLoginRegister>
                        </ContextAddress>
                 </ContextLogin>
        </BrowserRouter>
    )
}

export default MyRoutes