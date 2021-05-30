import React from 'react';
import { Fragment } from 'react';

class Validacao extends React.Component {
    
    constructor(props){
        super(props)
    }

    onCloseAlert = () => {
        this.props.showAlert();
    }

    render() {
        return (
            <Fragment>
               {
                   this.props.error == true && (
                       <div className="alert alert-danger alert-dismissible fade show " role="alert">
                          {
                              this.props.mensagem.map((mensagem, index) => {
                                 return (
                                     <p key={index} style={{ margin:"0"}}>
                                         <i className="fa fa-check-circle"></i>
                                         <span>{mensagem}</span>
                                     </p>
                                 )
                              })
                          }
                          <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                               onClick={() => this.onCloseAlert()}>
                               <span aria-hidden="true">&times;</span>    
                          </button>

                       </div> 
                   )
               }  
            </Fragment>
        )
    }
}

export default Validacao;