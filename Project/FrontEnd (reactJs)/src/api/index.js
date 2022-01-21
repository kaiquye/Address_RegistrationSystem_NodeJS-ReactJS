import axios from 'axios'

const Api = axios.create({
    baseURL : 'http://localhost:7070',
})
let Token = localStorage.getItem('Token')
axios.defaults.headers.post['header1'] = Token // for POST requests
// Api.interceptors.request.use((config)=>{
//     let Token = localStorage.getItem('Token')
//     console.log(Token)
//     if(Token){
//         Api.defaults.headersheaders = {
//             'Authorizantion' : Token
//         }
//     }else{
//         Api.defaults.headers = {
//             'Authorizantion' : Token
//         }
//     }
//     return config
// })
export default Api