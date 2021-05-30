import http from "../util/Banco";

export const findAllUsers = async (paginaAtual, pageSize, dir, props) => {
    return (
        http.get(`/usuario/listar?paginaAtual=${paginaAtual}&pageSize=${pageSize}&dir=${dir}&props=${props}`)
            .then( (res) => {
                return res.data
        })
    )
}


export const findUserByName = async (nome, paginaAtual, pageSize, dir, props) => {
    let data = {
        paginaAtual:paginaAtual,
        pageSize:pageSize,
        dir:dir,
        props:props,
    }
    return (
        http({
            method:'get',
            url : `/usuario/listar/${nome}`,
            data:data,
            headers : {
                'Content-type':'application/json'
            },
       }).then(res=>{
            return  res.data
        })
    )
}


export const findUserById = async ( id ) => {
    return (
        http.get(`/usuario/buscar/${id}`)
            .then( (res) => {
                return res.data;
            }).catch(error => {
                return error.response
            })
    )
}


export const createUser = async (usuario) => {
    return (
        http({
            method:'post',
            url:'/usuario/inserir',
            data:usuario,
            headers:{
                'Content-Type':'application/json',
            }
        }).then(res => {
            return res.data;
        }).catch(error => {
            return error.response
        })
    )
}

export const updateUser = async (usuario) => {
    return (
        http({
            method:'post',
            url:'/usuario/alterar',
            data:usuario,
            headers:{
                'Content-Type':'application/json',
            }
        }).then(res => {
            return res.data;
        }).catch(error => {
            return error.response
        })
    )
}