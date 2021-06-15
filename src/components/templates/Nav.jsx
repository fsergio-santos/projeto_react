import React from 'react'

import Menu from "./Menu";
import Header from "../Header";

class Nav extends React.Component {

    constructor(){
        super();
        this.state = {
            cliclMenu:true,
        }
    }

    showSideBar = (estado) => {
     this.setState({
        clickMenu:estado
     }, () => this.showMenu())   
    }
    
    showMenu = () =>{
        this.state.clickMenu === true 
            ? document.body.classList.remove("sidenav-toggled")    
            : document.body.classList.add("sidenav-toggled");
    }


    render() { 
        return (
            <React.Fragment>
                <Header showSideBar={(estado) => this.showSideBar(estado)}/>
                <Menu/>
            </React.Fragment>
        );
    }
}
 
export default Nav;