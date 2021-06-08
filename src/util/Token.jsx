
export const setUsuario = ( usuario ) => {
    console.log(usuario);
    localStorage.setItem('token',usuario.token);
    localStorage.setItem('username',usuario.usernamne);
    localStorage.setItem('email',usuario.email);
}

export const getToken = () => {
    return localStorage.getItem('token');
}

export const getUsername = () => {
    return localStorage.getItem('username');
}

export const getEmail = () => {
    return localStorage.getItem('email');
}

export const clearLocalStorage = () => {
    return localStorage.clear();
}


