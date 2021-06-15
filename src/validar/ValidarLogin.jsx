
export const validarLoginFromSever = (state, data ) => {

    let { toReturn, formValidation } = state;

    for ( let i = 0 ; i < data.fields.length; i++ ){
  
        if ( data.fields[i].nome === "password") {
            formValidation.password.push(data.fields[i].userMessage);
            formValidation.validPassword = true; 
            toReturn = true;
        }

        if ( data.fields[i].nome === "email") {
            formValidation.email.push(data.fields[i].userMessage);
            formValidation.validEmail = true; 
            toReturn = true;
        }

    }

    state = { toReturn, formValidation };

    return state;
}    

