
export const setUsuario = ( usuario ) => {
    localStorage.setItem('token',usuario.data.token);
    localStorage.setItem('username',usuario.data.usernamne);
    localStorage.setItem('email',usuario.data.email);
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


