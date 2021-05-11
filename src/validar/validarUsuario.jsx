const VALID_EMAIL = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

export const validarUsuario = (state) => {

    console.log("na função de validação >>>>>>>>>>>>>>>>>>>>")

    let { username, email, password, confirmPassword, departamento, roles, formValidation, toReturn } = state;

    if ( username.trim().length === 0){
        formValidation.username.push("Nome do usuário não pode ser vázio");
        formValidation.validUserName = true;
        toReturn = true;
    }

    if ( username.trim().length >= 100 ){
        formValidation.username.push("Nome do usuário não pode ter mais do que 100 caracteres ");
        formValidation.validUserName = true; 
        toReturn = true;
    }

    if ( username.trim().length <= 5 ){
        formValidation.username.push("Nome do usuário não pode ter menos do que 5 caracteres ");
        formValidation.validUserName = true; 
        toReturn = true;
    }


    if (!VALID_EMAIL.test(email)){
        formValidation.email.push("E-mail do usuário inválido! ");
        formValidation.validEmail = true; 
        toReturn = true;
    }

    if ( email.trim().length >= 100 ){
        formValidation.email.push("E-mail do usuário não pode ter mais do que 100 caracteres ");
        formValidation.validEmail = true; 
        toReturn = true;
    }

    if ( email.trim().length <= 5 ){
        formValidation.email.push("E-mail do usuário não pode ter menos do que 5 caracteres ");
        formValidation.validEmail = true; 
        toReturn = true;
    }

    if ( password.trim().length === 0){
        formValidation.password.push("A senha do usuário não pode ser vázio");
        formValidation.validPassword = true;
        toReturn = true;
    }

    if ( password.trim().length >= 100 ){
        formValidation.password.push("A senha do usuário não pode ter mais do que 100 caracteres ");
        formValidation.validPassword = true; 
        toReturn = true;
    }

    if ( password.trim().length <= 5 ){
        formValidation.password.push("A senha do usuário não pode ter menos do que 5 caracteres ");
        formValidation.validPassword = true; 
        toReturn = true;
    }



    if ( confirmPassword.trim().length === 0){
        formValidation.confirmPassword.push("A senha do usuário não pode ser vázio");
        formValidation.validConfirmPassword = true;
        toReturn = true;
    }

    if ( confirmPassword.trim().length >= 100 ){
        formValidation.confirmPassword.push("A senha do usuário não pode ter mais do que 100 caracteres ");
        formValidation.validConfirmPassword = true; 
        toReturn = true;
    }

    if ( confirmPassword.trim().length <= 5 ){
        formValidation.confirmPassword.push("A senha do usuário não pode ter menos do que 5 caracteres ");
        formValidation.validConfirmPassword = true; 
        toReturn = true;
    }
    
    if ( password !== confirmPassword ){
        formValidation.confirmPassword.push("A confirmação da senha e senha não confere  ");
        formValidation.validConfirmPassword = true; 
        toReturn = true;
    }

    if ( departamento.trim().length === 0 ){
        formValidation.departamento.push("O Departamento deve ser informado  ");
        formValidation.validSelect = true; 
        toReturn = true;
    }

    let cont = 0; 

    for (let i = 0; i < roles.length; i++  ){
        if (roles[i].check === true){
            cont++
        }
    }
    
    if ( cont === 0 ) {
        formValidation.roles.push("Obrigatório selecionar pelo menos uma Role - ");
        formValidation.validRoles = true;
        toReturn = true;
    }

    console.log(toReturn)
  
    state = { toReturn, formValidation } 
    
    return state;

}