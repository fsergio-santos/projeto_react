import { actionsTypes } from "../actions/mensagemActions";


const INIT_STATE = {
    alert : {
        mensagem:'', //Registro cadastrado com sucesso!
        opcao :'',   //success, error, info, warning
        show: false  //falso - não tenho mensagem para mostrar, true = tenho uma mensagem para mostrar
    }
}

const mensagensReducers = (state = INIT_STATE, {  type, alert} ) => {
    switch( type ){
        case actionsTypes.SET_MENSAGEM:
           return {
                alert :{
                    ...state.alert,
                    ...alert
                }
            }
        case actionsTypes.GET_MENSAGEM:
            return {
                ...alert,
            }    
        default:
            return state;    
    }
        
    
    
    
    return ;
}

export default mensagensReducers;
