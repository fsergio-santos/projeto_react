import http from "../util/Banco";
import { getToken } from "../util/Token";

export const findAllRoles = async (paginaAtual, pageSize, dir, props) => {

    return (
        http.get(`/role/listar?paginaAtual=${paginaAtual}&pageSize=${pageSize}&dir=${dir}$props=${props}`,{
            headers:{
                Authorization: `Bearer ${getToken()}`
            },
        }).then((res)=>{
                return res.data;
        }).catch( (error) => {
            return error.responde;
        })
    )
}