import http from "../util/Banco";

export const findAllDepartamentos = async () => {

    return (
        http.get("/departamento/listar")
            .then( (res) => {
                return res.data
        })
    )
}


export const findDepartamentoByName = async (value) => {
    return ( 
      http({
          method:"get",
          url:`/departamento/buscaDepartamento?q=${value}`,
          headers:{
              'Content-Type':'application/json'
          },
      }).then(res => {
        return res.data;
      })     
    )
}