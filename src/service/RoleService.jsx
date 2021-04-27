import http from "../util/Banco";

export const findAllRoles = async (paginaAtual, pageSize, dir, props) => {
    return (
        http.get(`/role/listar?paginaAtual=${paginaAtual}&pageSize=${pageSize}&dir=${dir}$props=${props}`)
            .then((res)=>{
                return res.data;
            })
    )
}