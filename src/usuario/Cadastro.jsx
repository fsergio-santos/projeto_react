import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../components/templates/Cabecalho';
import { findAllDepartamentos, findDepartamentoByName } from '../service/DepartamentoService';
import { findAllRoles } from '../service/RoleService';
import { findUserById } from "../service/UsuarioService";
import CadastrarRoles from './CadastrarRoles';

class CadastroUsuario extends Component {
   
    constructor(props){
        super(props)
        this.state = this.initState();
        this.cadastrarRoles = this.cadastrarRoles.bind(this);
        this.onChangeItem = this.onChangeItem.bind(this);
        this.searchChangeDepartement = this.searchChangeDepartement.bind(this);

    }

    initState = () => ({
        id:undefined,
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
        departamento:'',
        departamentos:[],

        roles:[],


        showModal : false,
       
        value:"",
        selectedValue:"",
        showDropdown:false,
        search:"",
        selectedIndex:"",

    })

    componentDidMount(){
        const { id } = this.props.match.params;

        this.loadData(id);
    }

    
    async loadData(id){

        let usuario = undefined;
        let roles=[];
        let departamentos=[];


        if ( id !== undefined ){
            usuario = await findUserById(id);
            this.setState({
                id:usuario.id,
                username:usuario.username,
                email:usuario.email,
                password:usuario.password,
                departamento:usuario.departamento,
            })
                 

        }

        const paginaAtual = 0; 
        const pageSize = 15;
        const dir = "asc";
        const props="id";

        const data_roles = await findAllRoles(paginaAtual, pageSize, dir, props);

        if ( id !== undefined ) {
            for ( let i = 0 ; i < data_roles.content.length; i++ ){
                for ( let j = 0; j < usuario.roles.length; j++  ){
                    if ( data_roles.content[i].id === usuario.roles[j].id){
                        roles.push({
                            id:data_roles.content[i].id,
                            nome:data_roles.content[i].nome,
                            check:true,
                        });
                        data_roles.content.splice(i, 1);
                    }
                }
            }
        }
    
        for (let i = 0 ; i < data_roles.content.length; i++){
            roles.push({
                id:data_roles.content[i].id,
                nome:data_roles.content[i].nome,
                check:false,
            });
        }

        const data_departamentos = await findAllDepartamentos();

        departamentos = data_departamentos.map((d) => ({
            id:d.id,
            nome:d.nome,
        }));

        this.setState({
            roles: roles,
            departamentos:departamentos,
        })

        
   

    }


    showDropdown = () => {
       const { showDropdown } = this.state;
       this.setState({
           showDropdown:!showDropdown
       })
    }

    onChangeItem(value) {
        this.setState({
            value:value,
        })
    }

    async searchChangeDepartement(e){
        let value = e.target.value;

        const data_departamentos = await findDepartamentoByName(value.trim().toLowerCase())

        const departamentos = data_departamentos.map((d) => ({
            id:d.id,
            nome:d.text,
        }));

        this.setState({
            search:value, 
            departamentos:departamentos,
            selectedValue:value,
            value:value,
        })

    }

    changeSelectedDepartamento = (item, index) => {
        this.setState({
            selectedValue:item, 
            value:item,
            selectedIndex : index,
            search:"",
        }, this.showDropdown())
    }
  
    onChange = ( e ) => {     
        const { name, value } = e.target;
        this.setState({
            [name]:value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        //validarCampos()

        console.log("Salvando Registro.......")
        this.setState({
            state:this.initState,
        })
        this.props.history.push("/usuario/listar");
    }

    cadastrarRoles(e){
        e.preventDefault();
        this.setState({
            showModal:!this.state.showModal
        })
    }


    onChangeChecked = (e) => {
        const { roles } = this.state;
        let index = roles.findIndex((r) => r.id == e.target.value);
        roles[index].check  = !roles[index].check;
        this.setState({
            roles:roles
        });
    }

    render() { 
        //const { id } = this.props.match.params;
        const { username, 
                email, 
                password,  
                confirmPassword, 
                showModal, 
                roles, 
                value, 
                selectedValue, 
                showDropdown, 
                search,
                departamentos } = this.state;
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
                                                <label className="control-label">Departamento:</label>
                                                <div className="menu_dropdown">
                                                    <input type="hidden"
                                                      value={value}
                                                      onChange={(e) => this.onChangeItem(value)}/>
                                                </div>
                                                <div className="menu_dropdown_selected form-control"
                                                   onClick={()=> this.showDropdown()}>
                                                    {
                                                        selectedValue.nome ? selectedValue.nome : "Selecione uma opção "
                                                    } 
                                                </div>

                                                {
                                                  showDropdown && (
                                                      <div className="menu_dropdown_menu">
                                                          <input type="text" placeholder="buscar departamento"
                                                          className="menu_dropdown_search"
                                                          name="search"
                                                          value={search}
                                                          onChange={(e) => this.searchChangeDepartement(e)}/>

                                                   

                                                        <div className="menu_dropdown_items">
                                                        {
                                                            departamentos.map((item)=>(
                                                            <div className={
                                                                selectedValue.nome === item.nome 
                                                                    ? `menu_dropdown_item menu_dropdown_item-${departamentos.indexOf(item)} selected`
                                                                    : `menu_dropdown_item menu_dropdown_item-${departamentos.indexOf(item)}`
                                                                }          
                                                                key={item.id}
                                                                onClick={() => this.changeSelectedDepartamento(item, departamentos.indexOf(item))} >
                                                                {item.nome}     
                                                            </div> 
                                                            ))}

                                                        </div>
                                                  </div>
                                                  )} 

                                                

                                                    
                                                <div className="invalid-feedback">
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
    
                            <input type="hidden" id="id" name="id" value="" />
                            <div className="tile-footer">
                                <button type="button" className="btn btn-primary" >Salvar</button>
                                <button type="button" className="btn btn-warning" id="btnModal" onClick={(e)=>this.cadastrarRoles(e)}>Cadastro de Roles</button>
                                <Link to={"/usuario/listar"} className="btn btn-warning">Cancelar</Link>
                            </div>
    
                        </form>
                    </div>
                </div>
            </div>
            { showModal ? <CadastrarRoles nome={username}
                                          roles={roles}
                                          showModal={showModal}
                                          cadastrarRoles={this.cadastrarRoles}
                                          onChangeChecked={this.onChangeChecked} /> : null}
         
        </section>
         
        );
    }
}
 
export default CadastroUsuario;