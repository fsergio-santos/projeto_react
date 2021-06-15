import http from '../util/Banco';

export const findUserByEmail = async ( email, password ) => {
    let login ={
        email,
        password,
    };
    return (
        http({
            method:'post',
            url:'/login',
            data:login,
            headers:{
                'Content-Type':'application/json'
            }
        }).then( response => {
            return response;
        }).catch( error => {
            return error.response;
        })
    )

}