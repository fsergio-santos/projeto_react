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
        }).then( res => {
            return res.data;
        }).catch( error => {
            return error.response;
        })
    )

}