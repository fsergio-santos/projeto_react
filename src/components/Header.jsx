import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showMenu:true
    }
   
  }

  showSideBar = () => {
      this.setState(state => ({
          showMenu:!state.showMenu,
      }), () => this.showMenu())
  };

  showMenu = () => {
    this.props.showSideBar(this.state.showMenu)
  }

  render() {
    return (
      <React.Fragment>
        <header className="app-header">
          <a className="app-header__logo">Projeto</a>
          <a className="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hide Sidebar" 
              onClick={this.showSideBar.bind(this)}
          ></a>
          <div className="app-nav">
            <img
              className="app-sidebar__user-avatar"
              id="fotoSideDisco"
            />
            <a
              className="linkHeader"
		   	  href="#"
            ></a>
            <a
               className="linkLogout"
               href="#"
            >
              <i className="fa fa-sign-out fa-lg"></i>Logout
            </a>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
