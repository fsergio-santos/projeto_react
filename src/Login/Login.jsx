import React from "react";
import Alert from "../components/templates/Alert";

import MensagemErro from "../components/templates/MensagemErro";
import { findUserByEmail } from "../service/LoginService";
import { setUsuario } from "../util/Token";
import { validarLoginFromSever } from "../validar/ValidarLogin";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
  }

  initState = () => ({
    email: "",
    password: "",

    formValidation: {
      email: [],
      password: [],

      validEmail: false,
      validPassword: false,
    },

    mensagem: [],
    showMensagem: false,
  });

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  async onLogin(e) {
    const { email, password, mensagem } = this.state;
    let usuario = undefined;
    e.preventDefault();
    usuario = await findUserByEmail(email, password);

    if (usuario.data.status === 400) {
      const state = validarLoginFromSever(this.state, usuario.data);
      this.setState({
        formValidation: state.formValidation,
        toReturn: state.toReturn,
      });
      return;
    }

    if (usuario.data.status > 400) {
      mensagem.push(usuario.data.detail);
      mensagem.push(usuario.data.title);
      this.setState({
        mensagem: mensagem,
        showMensagem: true,
      });
      return;
    }

    setUsuario(usuario);

    this.props.history.push("/usuario/listar");
  }

  showMensagem() {
    this.setState({
      showMensagem: !this.state.showMensagem,
      mensagem: [],
    });
  }

  render() {
    const { email, password, formValidation, mensagem, showMensagem } =
      this.state;
    return (
      <React.Fragment>
        <section className="material-half-bg">
          <div className="cover"></div>
        </section>
        <section className="login-content">
          <div className="logo">
            <h1>Financeiro</h1>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12">
            <Alert
              mensagem={mensagem}
              error={showMensagem}
              showAlert={this.showMensagem.bind(this)}
            />
          </div>
          <div className="login-box">
            <form className="login-form">
              <h3 className="login-head">
                <i className="fa fa-lg fa-fw fa-user"></i>SIGN IN
              </h3>
              <div className="form-group">
                <label className="control-label">Usuário</label>
                <input
                  className="form-control"
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
                  }
                />
                <MensagemErro
                  error={formValidation.validEmail}
                  message={formValidation.email}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Senha</label>
                <input
                  className="form-control"
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
                  }
                />
                <MensagemErro
                  error={formValidation.validPassword}
                  message={formValidation.password}
                />
              </div>
              <div className="form-group">
                <div className="utility">
                  <div className="animated-checkbox">
                    <label>
                      <input type="checkbox" />
                      <span className="label-text">Stay Signed in</span>
                    </label>
                  </div>
                  <p className="semibold-text mb-2">
                    <a href="#" data-toggle="flip">
                      Forgot Password ?
                    </a>
                  </p>
                </div>
              </div>
              <div className="form-group btn-container">
                <button
                  className="btn btn-primary btn-block"
                  onClick={(e) => this.onLogin(e)}
                >
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
