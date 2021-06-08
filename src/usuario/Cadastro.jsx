import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cabecalho from "../components/templates/Cabecalho";
import Validacao from "../components/Validacao";
import {
  findAllDepartamentos,
  findDepartamentoByName,
} from "../service/DepartamentoService";
import { findAllRoles } from "../service/RoleService";
import {
  findUserById,
  createUser,
  updateUser,
} from "../service/UsuarioService";
import { validarUsuario, validUserFromSever } from "../validar/ValidarUsuario";
import CadastrarRoles from "./CadastrarRoles";
import MensagemErro from "../components/templates/MensagemErro";


class CadastroUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.cadastrarRoles = this.cadastrarRoles.bind(this);
    this.onChangeItem = this.onChangeItem.bind(this);
    this.searchChangeDepartement = this.searchChangeDepartement.bind(this);
    this.validarUsuario = this.validarUsuario.bind(this);
  }

  initState = () => ({
    id: undefined,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    departamento: "",
    departamentos: [],
    roles: [],
    foto: "",
    contentType: "",

    showModal: false,

    value: "",
    selectedValue: "",
    showDropdown: false,
    search: "",
    selectedIndex: "",

    mensagem:[],
    showMensagem:false,

    paginaAtual:0,
    pageSize:15,
    dir:"asc",
    props:"id",

    formValidation : {
      username:[],
      email:[],
      password:[],
      departamento:[],
      confirmPassword:[],
      roles:[],

      validUserName: false,
      validEmail:false,
      validPassword:false,
      validConfirmPassword:false,
      validDepartamento:false,
      validSelect:false,
      validRoles:false,
    }

  });

  componentDidMount() {
    const { id } = this.props.match.params;

    this.loadData(id);
  }

  async loadData(id) {
    const { paginaAtual, pageSize, dir, props } = this.state;
    let usuario = undefined;
    let roles = [];
    let departamentos = [];

    if (id !== undefined) {
      usuario = await findUserById(id);
      this.setState({
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        password: usuario.password,
        departamento: usuario.departamento,
        value: usuario.departamento,
        selectedValue: usuario.departamento,
      });
    }

   

    const data_roles = await findAllRoles(paginaAtual, pageSize, dir, props);

    if (id !== undefined) {
      for (let i = 0; i < data_roles.content.length; i++) {
        for (let j = 0; j < usuario.roles.length; j++) {
          if (data_roles.content[i].id === usuario.roles[j].id) {
            roles.push({
              id: data_roles.content[i].id,
              nome: data_roles.content[i].nome,
              check: true,
            });
            data_roles.content.splice(i, 1);
          }
        }
      }
    }

    for (let i = 0; i < data_roles.content.length; i++) {
      roles.push({
        id: data_roles.content[i].id,
        nome: data_roles.content[i].nome,
        check: false,
      });
    }

    const data_departamentos = await findAllDepartamentos();

    departamentos = data_departamentos.map((d) => ({
      id: d.id,
      nome: d.nome,
    }));

    this.setState({
      roles: roles,
      departamentos: departamentos,
    });
  }

  showDropdown = () => {
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown,
    });
  };

  onChangeItem(value) {
    this.setState({
      value: value,
    });
  }

  async searchChangeDepartement(e) {
    let value = e.target.value;

    const data_departamentos = await findDepartamentoByName(
      value.trim().toLowerCase()
    );

    const departamentos = data_departamentos.map((d) => ({
      id: d.id,
      nome: d.text,
    }));

    this.setState({
      search: value,
      departamentos: departamentos,
      selectedValue: value,
      value: value,
    });
  }

  changeSelectedDepartamento = (item, index) => {
    console.log(item)
    this.setState({
        selectedValue: item,
        value: item,
        selectedIndex: index,
        search: "",
        departamento: item,
      });
      this.showDropdown();
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validarUsuario() {
   
   let { toReturn, formValidation } = this.state;

   let state = validarUsuario(this.state); 

   formValidation = state.formValidation;

   toReturn = state.toReturn; 

   this.setState({
       formValidation:formValidation,
   })

   return toReturn;
  }

  handleSubmitUsuario = (e) => {
    e.preventDefault();
    if (this.validarUsuario() === false) {
      this.salvarUsuario();
    }
  };

  async salvarUsuario() {
    let toReturn = false;

    const {
      id,
      username,
      email,
      password,
      confirmPassword,
      departamento,
      roles,
      foto,
      contentType,
      mensagem,
      
    } = this.state;

    let usuario = {
      id: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      departamento: "",
      roles: [],
      foto: "",
      contentType: "",
    };

    if (id === undefined) {
      usuario.username = username;
      usuario.email = email;
      usuario.password = password;
      usuario.confirmPassword = confirmPassword;
      usuario.departamento = departamento === "" ? {id:undefined} : departamento;
      usuario.foto = foto;
      usuario.contentType = contentType;

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].check === true) {
          usuario.roles.push({
            id: roles[i].id,
            nome: roles[i].nome,
          });
        }
      }

     const data = await createUser(usuario);

     if ( data.status === 400 ) {
          const state = validUserFromSever( this.state, data );
          toReturn = state.toReturn;
          this.setState({
            toReturn:toReturn,
            formValidation: state.formValidation,
          })
     } 

     if ( data.status > 400 ){
          toReturn = true;
          mensagem.push(data.data.detail);
          mensagem.push(data.data.title);
          this.setState({
              mensagem:mensagem,
              showMensagem:true,
          })

     }

     
    } else {
      usuario.id = id;
      usuario.username = username;
      usuario.email = email;
      usuario.password = password;
      usuario.confirmPassword = confirmPassword;
      usuario.departamento = departamento;
      usuario.foto = foto;
      usuario.contentType = contentType;

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].check === true) {
          usuario.roles.push({
            id: roles[i].id,
            nome: roles[i].nome,
          });
        }
      }

      const data = updateUser(usuario);
      if ( data.status === 400 ) {
            const state = validUserFromSever( this.state, data );
            toReturn = state.toReturn;
            this.setState({
              toReturn:toReturn,
              formValidation: state.formValidation,
            })
      } 

      if ( data.status > 400 ){
            toReturn = true;
            mensagem.push(data.data.detail);
            mensagem.push(data.data.title);
            this.setState({
                mensagem:mensagem,
                showMensagem:true,
            })

      }
    }

    if ( toReturn === false ) {
      this.setState({
        state: this.initState,
      });
      this.props.history.push("/usuario/listar");
    }   
  };

  cadastrarRoles(e) {
    e.preventDefault();
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  onChangeChecked = (e) => {
    const { roles } = this.state;
    let index = roles.findIndex((r) => r.id == e.target.value);
    roles[index].check = !roles[index].check;
    this.setState({
      roles: roles,
    });
  };

  
  showMensagem(){
    this.setState({
      showMensagem: !this.state.showMensagem,
      mensagem:[],
    })
  }



  render() {
    //const { id } = this.props.match.params;
    const {
      username,
      email,
      password,
      confirmPassword,
      showModal,
      roles,
      value,
      selectedValue,
      showDropdown,
      search,
      departamentos,
      formValidation,
      showMensagem,
      mensagem,
    } = this.state;
    return (
      <section>
        <div className="container">
          <Cabecalho
            path="/usuario/listar"
            tituloPagina="Cadastro do Usuário"
            tituloPesquisa="Lista de Usuários"
          />
          <div className="tile">
            <div className="tile-body">
              <form onSubmit={this.handleSubmitUsuario} id="formUsuario">
                { showMensagem && (
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12">
                        <Validacao mensagem={mensagem} error={showMensagem} showAlert={this.showMensagem.bind(this)}/>
                    </div>
                  </div> 
                )}
                <div className="row">
                  <div className="col-sm-4">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <div id="drop-zone">
                            <input type="hidden" value="" id="cFoto" />
                            <input type="hidden" value="" id="contentType" />
                            <div id="fotoDisco">
                              <img
                                src=""
                                className="avatar"
                                id="imageUpload"
                                name="upload"
                              />
                            </div>
                            <div id="clickHereLeft">
                              <input
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                id="fileInput"
                                className="form-control hide btn-responsive"
                              />
                              <div style={{ textAlign: "center" }}>
                                <label htmlFor="fileInput">
                                  {" "}
                                  <i className="fa fa-upload fa-lg"></i>
                                </label>
                              </div>
                            </div>
                            <div id="clickHereRight">
                              <input
                                type="button"
                                id="fileExcluir"
                                className="form-control hide btn-responsive"
                              />
                              <div style={{ textAlign: "center" }}>
                                <label htmlFor="fileExcluir">
                                  <i className="fa fa-trash fa-lg"></i>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label className="control-label">Nome:</label>{" "}
                          <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => this.onChange(e)}
                            className={
                                formValidation.validUserName === true 
                                   ? "form-control is-invalid" 
                                   :  "form-control"
                            }
                          />
                          <MensagemErro error={formValidation.validUserNome} mensagem={formValidation.username}/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label className="control-label">E-mail</label>{" "}
                          <input
                            type="text"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => this.onChange(e)}
                            className={
                              formValidation.validEmail === true 
                                 ? "form-control is-invalid" 
                                 : "form-control"
                            }
                          />
                         <MensagemErro error={formValidation.validEmail} mensagem={formValidation.email}/> 
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label className="control-label">Senha:</label>{" "}
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => this.onChange(e)}
                            className={
                              formValidation.validPassword === true 
                                 ? "form-control is-invalid" 
                                 : "form-control"
                            }
                          />
                          <MensagemErro error={formValidation.validPassword} mensagem={formValidation.password}/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label className="control-label">
                            Confirma Senha:
                          </label>{" "}
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => this.onChange(e)}
                            className={
                              formValidation.validConfirmPassword === true 
                                 ? "form-control is-invalid" 
                                 : "form-control"
                            }
                          />
                          <MensagemErro error={formValidation.validConfirmPassword} mensagem={formValidation.confirmPassword}/>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12">
                        <div className="form-group">
                          <label className="control-label">Departamento:</label>
                          <div className="menu_dropdown">
                            <input
                              type="hidden"
                              value={value}
                              onChange={(e) => this.onChangeItem(value)}
                            />
                          </div>
                          <div
                            className={ formValidation.validSelect === true 
                              ? "menu_dropdown_selected form-control is-invalid"
                              : "menu_dropdown_selected form-control"
                            }
                            onClick={() => this.showDropdown()}
                          >
                            {selectedValue.nome
                              ? selectedValue.nome
                              : "Selecione uma opção "}
                          </div>
                          <MensagemErro error={formValidation.validSelect} mensagem={formValidation.departamento}/>
                          {showDropdown && (
                            <div className="menu_dropdown_menu">
                              <input
                                type="text"
                                placeholder="buscar departamento"
                                className="menu_dropdown_search"
                                name="search"
                                value={search}
                                onChange={(e) =>
                                  this.searchChangeDepartement(e)
                                }
                              />
                              <div className="menu_dropdown_items">
                                {departamentos.map((item) => (
                                  <div
                                    className={
                                      selectedValue.nome === item.nome
                                        ? `menu_dropdown_item menu_dropdown_item-${departamentos.indexOf(
                                            item
                                          )} selected`
                                        : `menu_dropdown_item menu_dropdown_item-${departamentos.indexOf(
                                            item
                                          )}`
                                    }
                                    key={item.id}
                                    onClick={() =>
                                      this.changeSelectedDepartamento(
                                        item,
                                        departamentos.indexOf(item)
                                      )
                                    }
                                  >
                                    {item.nome}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <input type="hidden" id="id" name="id" value="" />
                <div className="tile-footer">
                  <button type="submit" className="btn btn-primary ml-2">
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning ml-2"
                    id="btnModal"
                    onClick={(e) => this.cadastrarRoles(e)}
                  >
                    Cadastro de Roles
                  </button>
                  <Link to={"/usuario/listar"} className="btn btn-secondary ml-2">
                    Cancelar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showModal ? (
          <CadastrarRoles
            nome={username}
            roles={roles}
            showModal={showModal}
            cadastrarRoles={this.cadastrarRoles}
            onChangeChecked={this.onChangeChecked}
          />
        ) : null}
      </section>
    );
  }
}

export default CadastroUsuario;
