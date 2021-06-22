export const actionsTypes = {
    SET_MENSAGEM:'SET_MENSAGEM',
    GET_MENSAGEM:'GET_MENSAGEM',
}


export const setMensagem = ( alert ) => {
    return {
        type:actionsTypes.SET_MENSAGEM,
        alert,
    }
} 

export const getMensagem = ( alert ) => {
    return {
        type:actionsTypes.GET_MENSAGEM,
        alert,
    }
}  


export const setShowMensagem = ( mensagem, opcao, show ) => dispatch => {
    alert={
        mensagem,
        opcao,
        show
    }
    dispatch( setMensagem( alert ));
}

export const getShowMensagem = () => dispatch => {
    const alert = {
        mensagem:'',
        opcao:'',
        show:true,
    }
    dispatch( getMensagem( alert ) );
}


