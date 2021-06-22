import http from "../util/Banco";
import { getToken } from "../util/Token";

export const findAllDepartamentos = async () => {

    return (
        http.get("/departamento/listar",{
            headers:{
                Authorization: `Bearer ${getToken()}`
            },
        }).then( (res) => {
           return res.data
        }).catch( (error)=>{
            return error.response;
        })
    )
}


export const findDepartamentoByName = async (value) => {
    return ( 
      http({
          method:"get",
          url:`/departamento/buscaDepartamento?q=${value}`,
          headers:{
              'Content-Type':'application/json',
              Authorization: `Bearer ${getToken()}`
          },
      }).then(res => {
        return res.data;
      })     
    )
}