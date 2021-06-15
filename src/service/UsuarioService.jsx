import http from "../util/Banco";
import { getToken } from "../util/Token";


export const findAllUsers = async (paginaAtual, pageSize, dir, props) => {
    return (
        http.get('/usuario/listar',{
            headers:{
                Authorization: `Bearer ${getToken()}`
            },
        }).then( (res) => {
            return res.data
        }).catch( (error ) => {
            console.log(error.response);
            return error.response;
        })
    )
}


export const findUserByName = async (nome, paginaAtual, pageSize, dir, props) => {
    let data = {
        paginaAtual,
        pageSize,
        dir,
        props,
    }
    return (
        http({
            method:'get',
            url : `/usuario/listar/${nome}`,
            data:data,
            headers : {
                'Content-type':'application/json',
                Authorization: `Bearer ${getToken()}`
            },
            
       }).then(res=>{
            return  res.data
       }).catch(error => {
            return error.response
       })
    )
}


export const findUserById = async ( id ) => {
    return (
        http.get(`/usuario/buscar/${id}`,{
            headers:{
                Authorization: `Bearer ${getToken()}`
            },
        }).then( (res) => {
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
                Authorization: `Bearer ${getToken()}`
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
                Authorization: `Bearer ${getToken()}`
            }
        }).then(res => {
            return res.data;
        }).catch(error => {
            return error.response
        })
    )
}