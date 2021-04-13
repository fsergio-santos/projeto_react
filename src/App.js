import React, { Component } from 'react';
import { BrowserRouter, Switch, Route  } from "react-router-dom";

import './App.css';
import CadastroUsuario from './usuario/Cadastro';
import ListaUsuario from './usuario/Listar';


class App extends Component {
  
  render(){
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={ListaUsuario}/>
            <Route path="/usuario/listar" exact component={ListaUsuario}/>
            <Route path="/usuario/incluir" exact component={CadastroUsuario}/>
            <Route path="/usuario/alterar/:id" exact component={CadastroUsuario}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
