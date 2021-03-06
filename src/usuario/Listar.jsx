import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import SearchData from "../components/SearchData";
import SelectOptions from "../components/SelectOptions";
import Cabecalho  from "../components/templates/Cabecalho";
import TableHeader from "../components/TableHeader";
import { findAllUsers, findUserByName } from "../service/UsuarioService";
import Paginacao from "../components/templates/Paginacao";
import Nav from "../components/templates/Nav";

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Alert from '../components/templates/Alert';

import { getShowMensagem  } from "../store/actions/mensagemActions";

const headers = [
  {nome:"Foto", field:"foto", sort:false},
  {nome:"Id", field:"id", sort:true},
  {nome:"Nome", field:"username", sort:true},
  {nome:"E-mail", field:"email", sort:true}
]


class ListaUsuario extends Component {
  
  constructor() {
    super();
    this.state = this.initState();
    this.buscarDataPorNome = this.buscarDataPorNome.bind(this)
    this.onSorting = this.onSorting.bind(this);
    this.setNumberPaginaAtual = this.setNumberPaginaAtual.bind(this);
  }

  initState = () => ({
    usuarios: [],
    paginaAtual:0,
    pageSize:5,
    dir:"asc",
    totalCount:0,
    paginaFim:0,
    props:"id",
    nome:''
  });

  componentDidMount(){
    this.loadData()
  }

  onSorting(props, dir ) {
    this.setState({
      props:props,
      dir:dir 
    }, () => this.loadData())
  }
 
  setNumberPaginaAtual = (page) => {
    this.setState({
      paginaAtual:page
    }, () => this.loadData() )
  }


  async loadData(){

    const { paginaAtual, pageSize, dir, props } = this.state
    const res = await findAllUsers(paginaAtual, pageSize, dir, props);
    this.setState({
       usuarios:res.content,
       paginaAtual:res.number,
       pageSize:res.size,
       totalCount:res.totalElements,
       paginaFim:res.totalPages,
       dir:dir
     })
    } 

  setPageSize = ( size ) => {
    this.setState({
      pageSize:size
    }, () => this.loadData() ) 
  }


  async buscarDataPorNome(nome){
    const { paginaAtual, pageSize, dir, props } = this.state
    try {
        const res = await findUserByName(nome, paginaAtual, pageSize, dir, props);
        this.setState({
          usuarios:res.content,
          paginaAtual:res.number,
          pageSize:res.size,
          totalCount:res.totalElements,
          paginaFim:res.totalPages,
          dir:dir
        })
    } catch( erro ){
      console.log(erro);
    }
  }

  showMensagem(){

  }

  render() {
    const { usuarios, pageSize, paginaAtual, paginaFim, totalCount } = this.state;

    console.log(this.props.mensagem.alert);

    const { mensagem, opcao, show } = this.props.mensagem.alert;

    return (
      <Fragment>
        <section>
          <Nav/>
          <div className="container">

            <Cabecalho path="/" tituloPagina="Listagem de Usu??rios" tituloPesquisa="Menu Principal"/>

            <div className="col-xs-12 col-sm-12 col-md-12">
              { show && 
                <Alert mensagem={mensagem} success={opcao} showAlert={this.showMensagem.bind(this)}/>
              }
            </div>
            <div className="tile">
              <div className="tile-body">
                <div className="row">
                    <SelectOptions sizePage={pageSize} setPageSize={this.setPageSize}/>
                    <SearchData buscarDataPorNome={this.buscarDataPorNome}/>
                </div>
                <div id="no-more-tables">
                  <table
                    id="tabela"
                    className="table table-stripped table-bordered table-hover cf"
                  >
                    <TableHeader cabecalho={headers} onSorting={(props, dir )=>this.onSorting(props,dir)}/>
                    <tbody>
                      {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                          <td data-title="Foto"></td>
                          <td data-title="Id">{usuario.id}</td>
                          <td data-title="Nome">{usuario.username}</td>
                          <td data-title="E-mail">{usuario.email}</td>
                          <td data-title="A????o">
                            <Link
                              className="btn btn-info btn-sm"
                              title="Alterar Registro"
                              to={`/usuario/alterar/${usuario.id}`}
                            >
                              <i className="fa fa-pencil"></i>
                            </Link>
                            <Link
                              className="btn btn-danger btn-sm"
                              title="Excluir Registro"
                              to={`/usuario/excluir/${usuario.id}`}
                            >
                              <i className="fa fa-trash"></i>
                            </Link>
                            <Link
                              className="btn btn-secondary btn-sm"
                              title="Consultar Registro"
                              to={`/usuario/consultar/${usuario.id}`}
                            >
                              <i className="fa fa-search"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Paginacao paginaAtual={paginaAtual}
                           pageSize={pageSize}
                           paginaFim={paginaFim}
                           totalCount={totalCount}
                           setNumberPaginaAtual={(page) => this.setNumberPaginaAtual(page)}/>
                <Link
                  className="btn btn-sm btn-success"
                  title="Incluir Registro"
                  to={"/usuario/incluir"}
                >
                  <i className="fa fa-plus-circle"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ mensagem : state.mensagensReducer }) 
const mapDispatchToProps = dispatch => bindActionCreators({getShowMensagem}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListaUsuario);
