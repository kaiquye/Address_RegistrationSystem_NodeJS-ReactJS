import react from 'react'



function Table(props){
    
    return(
        <table>
              <tr>
                <th>LOCALIDADE</th>   <th>RUA</th>   <th>CEP</th>  <th>APAGAR</th> 
              </tr>
              {props.enderecos.map((e, index) => (
                  <tr>
                    <td>
                      <p> {e.zipcode} </p>
                    </td>
                    <td>
                      <p> {e.street}</p>
                    </td>
                    <td>
                      <p>{e.number} </p>
                    </td>
                    <td>
                      <button onClick={()=>props.apagar(e.id)}>Apagar</button>
                    </td>
                  </tr>
                ))}
        </table>
    )
}

export default Table