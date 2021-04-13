import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../components/templates/Cabecalho';

class CadastroUsuario extends Component {
   
    constructor(props){
        super(props)
        this.state = this.initState();
        //this.setUserName = this.setUserName.bind(this);
        //this.setEmail = this.setEmail.bind(this);
    }

    initState = () => ({
        id:undefined,
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
    })

    componentDidMount(){
        
    }
  
    onChange = ( e ) => {     
        const { name, value } = e.target;
        this.setState({
            [name]:value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("Salvando Registro.......")
        this.setState({
            state:this.initState,
        })
        this.props.history.push("/usuario/listar");
    }



    render() { 
        //const { id } = this.props.match.params;
        const { username, email, password,  confirmPassword } = this.state;
        return ( 
            
            <section >
            <div className="container">
                <Cabecalho path="/usuario/listar" tituloPagina="Cadastro do Usuário" tituloPesquisa="Lista de Usuários"/>
                <div className="tile">
                    <div className="tile-body">
                        <form method="POST"  id="formUsuario">
       
                            
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <div id="drop-zone">
                                                    <input type="hidden" value="" id="cFoto"/> 
                                                    <input type="hidden"  value="" id="contentType"/>
                                                    <div id="fotoDisco">
                                                        <img src="" className="avatar"
                                                            id="imageUpload" name="upload" />
                                                    </div>
                                                   <div id="clickHereLeft">
                                                        <input type="file" accept=".jpg, .jpeg, .png"
                                                            id="fileInput" className="form-control hide btn-responsive"/>
                                                        <div style={{ textAlign: "center" }}>
                                                            <label for="fileInput"> <i
                                                                className="fa fa-upload fa-lg"></i>
                                                            </label>
                                                        </div>
    
                                                    </div>
                                                    <div id="clickHereRight">
                                                        <input type="button" id="fileExcluir"
                                                            className="form-control hide btn-responsive"/>
                                                        <div style={{textAlign: "center"}}>
                                                            <label for="fileExcluir"><i
                                                                className="fa fa-trash fa-lg"></i></label>
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
                                                <label className="control-label">Nome:</label> <input type="text"
                                                    id="username" name="username" value={username}
                                                    onChange={(e) => this.onChange(e)}
                                                    className="form-control" />
                                                <div className="invalid-feedback">
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">E-mail</label> <input
                                                    type="text" id="email" name="email" value={email}
                                                    onChange={(e) => this.onChange(e)}

                                                    className="form-control" />
                                                <div className="invalid-feedback">
                                                    <span ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">Senha:</label> <input
                                                    type="password" id="password" name="password"
                                                    value={password}
                                                    onChange={(e) => this.onChange(e)}
                                            
                                                    className="form-control" />
                                                <div className="invalid-feedback">
                                                    <span ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">Confirma Senha:</label> <input
                                                    type="password" id="confirmPassword" name="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={(e) => this.onChange(e)}
                                                    className="form-control" />
                                                <div className="invalid-feedback">
                                                    <span ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-12 col-md-12">
                                            <div className="form-group">
                                                <label className="control-label">Departamento:</label> <select
                                                    id="selectDepartamento" name="departamento" className="form-control">
                                                    <option value="Financeiro" >Financeiro</option>
                                                </select>
                                                <div className="invalid-feedback">
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <fieldset>
                                        <legend>Grupos de Trabalho</legend>
                                        <div className="row">

                                        </div>
                                    </fieldset>
                                </div>
                            </div>
    
                            <input type="hidden" id="id" name="id" value="" />
                            <div className="tile-footer">
                                <button type="button" className="btn btn-primary" id="btnModal">Salvar</button>
                                <Link to={"/usuario/listar"} className="btn btn-warning">Cancelar</Link>
                            </div>
    
                        </form>
                    </div>
                </div>
            </div>
         
        </section>
         
        );
    }
}
 
export default CadastroUsuario;