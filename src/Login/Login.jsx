import React from "react";

import MensagemErro from "../components/templates/MensagemErro";
import { findUserByEmail } from "../service/LoginService";
import { setUsuario } from "../util/Token";

class Login extends React.Component {
  
    constructor(props){
        super(props)
        this.state = this.initState();
        
    }
  
    initState = () => ({
        email:'',
        password:'',

        formValidation : {
            email:[],
            password:[],

            validEmail:false,
            validPassword:false,
        },

    })

    
    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]:value
        })
    }

 
    async onLogin(e){
        
        let usuario = undefined; 
        e.preventDefault(); 
        const { email, password } = this.state;
        usuario = await findUserByEmail(email, password);

        console.log(usuario);

        setUsuario(usuario);
        
        this.props.history.push("/usuario/listar");
        
     }


     showMensagem(){
        this.setState({
          showMensagem: !this.state.showMensagem,
          mensagem:[],
        })
      }

    render() { 
        const { email, password, formValidation } = this.state;
        return ( 
           <React.Fragment>
             <section className="login-content">
               <div className="logo">
                     <h1>Financeiro</h1>
                </div>
                <div className="login-box">
                    <form className="login-form">
                        <h3 className="login-head"><i className="fa fa-lg fa-fw fa-user"></i>SIGN IN</h3>
                        <div className="form-group">
                        <label className="control-label">Usuário</label>
                        <input className="form-control" 
                                type="text"
                                id="email" 
                                name="email"
                                placeholder="E-mail" 
                                value={email}
                                onChange={(e) => this.onChange(e)}
                                autofocus
                                className={
                                    formValidation.validEmail === true 
                                       ? "form-control is-invalid" 
                                       : "form-control"
                                }/>
                                <MensagemErro error={formValidation.validEmail} message={formValidation.email}/>
                        </div>
                        <div className="form-group">
                        <label className="control-label">Senha</label>
                        <input className="form-control" 
                                type="password" 
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => this.onChange(e)}
                                placeholder="Password"
                                className={
                                    formValidation.validPassword === true 
                                       ? "form-control is-invalid" 
                                       : "form-control"
                                }/>
                              <MensagemErro error={formValidation.validPassword} message={formValidation.password}/>
                        </div>
                        <div className="form-group">
                        <div className="utility">
                            <div className="animated-checkbox">
                            <label>
                                <input type="checkbox"/><span className="label-text">Stay Signed in</span>
                            </label>
                            </div>
                            <p className="semibold-text mb-2"><a href="#" data-toggle="flip">Forgot Password ?</a></p>
                        </div>
                        </div>
                        <div className="form-group btn-container">
                            <button className="btn btn-primary btn-block"
                                onClick={(e) => this.onLogin(e)}>
                                <i className="fa fa-sign-in fa-lg fa-fw"></i>Acessar
                            </button>
                        </div>
                </form>
                
                </div>
            </section>
          </React.Fragment>

         );
    }
}
 
export default Login;