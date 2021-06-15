import React from "react";
import ReactDOM from "react-dom";

class Menu extends React.Component {

    
  toggledTreeview = (val) => {
    const elemento = ReactDOM.findDOMNode(this);
    const valorElemento = elemento.getElementsByClassName("treeview");
    valorElemento[val].classList.contains("is-expanded")
      ? elemento
          .getElementsByClassName("treeview")
          [val].classList.remove("is-expanded")
      : elemento
          .getElementsByClassName("treeview")
          [val].classList.add("is-expanded");
  };

  render() {
    return (
      <>
        <nav id="sidebar">
          <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
          <aside className="app-sidebar">
            <ul className="app-menu">
              <li>
                <a className="app-menu__item active" href="#">
                  <i className="app-menu__icon fa fa-dashboard"></i>
                  <span className="app-menu__label">Página Principal</span>
                </a>
              </li>
              <li className="treeview">
                <a
                  className="app-menu__item"
                  href="#"
                  data-toggle="treeview"
                  onClick={() => this.toggledTreeview(0)}
                >
                  <i className="app-menu__icon fa fa-laptop"></i>
                  <span className="app-menu__label">Cadastros</span>
                  <i className="treeview-indicator fa fa-angle-right"></i>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a className="treeview-item" href="/pessoa/pesquisar">
                      <i className="icon fa fa-circle-o"></i>Pessoas
                    </a>
                  </li>
                  <li>
                    <a
                      className="treeview-item"
                      href="/telefone/pesquisar"
                      target="_blank"
                      rel="noopener"
                    >
                      <i className="icon fa fa-circle-o"></i>Telefones por
                      Pessoa
                    </a>
                  </li>
                  <li>
                    <a className="treeview-item" href="ui-cards.html">
                      <i className="icon fa fa-circle-o"></i> Cards
                    </a>
                  </li>
                  <li>
                    <a className="treeview-item" href="widgets.html">
                      <i className="icon fa fa-circle-o"></i> Widgets
                    </a>
                  </li>
                </ul>
              </li>

              <li className="treeview">
                <a
                  className="app-menu__item"
                  href="#"
                  data-toggle="treeview"
                  onClick={() => this.toggledTreeview(1)}
                >
                  <i className="app-menu__icon fa fa-edit"></i>
                  <span className="app-menu__label">Segurança</span>
                  <i className="treeview-indicator fa fa-angle-right"></i>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a className="treeview-item" href="/role/pesquisar">
                      <i className="icon fa fa-circle-o"></i>Grupo de Usuário
                    </a>
                  </li>
                  <li>
                    <a className="treeview-item" href="/permissao/pesquisar">
                      <i className="icon fa fa-circle-o"></i>Permissões de
                      Usuário
                    </a>
                  </li>
                  <li>
                    <a className="treeview-item" href="/escopo/pesquisar">
                      <i className="icon fa fa-circle-o"></i>Escopo de Usuário
                    </a>
                  </li>
                  <li>
                    <a className="treeview-item" href="/usuario/listar">
                      <i className="icon fa fa-circle-o"></i>Usuários
                    </a>
                  </li>
                  <li>
                    <a className="treeview-item" href="/direitos/pesquisar">
                      <i className="icon fa fa-circle-o"></i> Direitos de Acesso
                    </a>
                  </li>
                </ul>
              </li>
              <li className="treeview">
                <a
                  className="app-menu__item"
                  href="#"
                  data-toggle="treeview"
                  onClick={() => this.toggledTreeview(2)}
                >
                  <i className="app-menu__icon fa fa-key"></i>
                  <span className="app-menu__label">Alterar Senha</span>
                  <i className="treeview-indicator fa fa-angle-right"></i>
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a className="treeview-item" href="/trocar/senha">
                      <i className="icon fa fa-circle-o"></i>Trocar Senha
                    </a>
                  </li>
                </ul>
              </li>
              <li className="treeview">
                <a
                  className="app-menu__item"
                  href="#"
                  data-toggle="treeview"
                  onClick={() => this.toggledTreeview(3)}
                >
                  <i className="app-menu__icon fa fa-file-text"></i>
                  <span className="app-menu__label">Pages</span>
                  <i className="treeview-indicator fa fa-angle-right"></i>
                </a>
                <ul className="treeview-menu"></ul>
              </li>
            </ul>
          </aside>
        </nav>
      </>
    );
  }
}

export default Menu;
