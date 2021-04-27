
import { Button, Modal } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const CadastrarRoles = ({nome, roles, showModal, cadastrarRoles, onChangeChecked  }) => {


    const onClose = (e) => {
       cadastrarRoles(e) 
    }

    const onChangeCheckedRoles = (e) => {
        onChangeChecked(e)
    }
    

    return (
        <div className="container pt-5">
            <div className="tile">
                <div className="tile-body">
                    <Modal show={showModal} 
                           size="lg" 
                           aria-labelledby="contained-modal-title-vcenter" 
                           centered>
                    <Modal.Header>
                         <Modal.Title>Cadastro de Roles para o Usuário</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <div className="row">
                           <div className="col-md-12">
                               <div className="form-group">
                                  <label className="control-label">Nome do Usuário: </label>     
                                  <input tupe="text" id="nome" name="nome" className="form-control" defaultValue={nome}/>
                               </div>     
                           </div> 
                       </div> 
                       <div id="no-more-tables">

                            <table className="table table-stripped table-bordered table-table-hover cf">
                                <thead className="cf">
                                    <tr className="p-3 mb-2 bg-primary text-white">
                                        <th className="table-col">Id</th>
                                        <th className="table-col">Nome</th>
                                        <th className="table-col">Check</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  {
                                      roles.map((role) => ( 
                                        <tr key={role.id}>  
                                          <td data-title="Id">{role.id}</td>
                                          <td data-title="Nome">{role.nome}</td>
                                          <td data-title="Check">
                                              <input type="checkbox" 
                                                     checked={role.check} 
                                                     value={role.id}
                                                     onChange={(e) => onChangeCheckedRoles(e)}/>
                                          </td>
                                        </tr>
                                      ))
                                  }
                                </tbody>
                            </table>
                       </div>
                   
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => onClose(e)}>Fechar</Button>
                        <Button variant="primary" onClick={(e) => onClose(e)}>Salvar</Button>
                    </Modal.Footer>
                   </Modal> 
                </div>
            </div>
        </div>
    )

}

export default CadastrarRoles;