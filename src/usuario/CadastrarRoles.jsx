import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const CadastrarRoles = () => {


    return (
        <div className="container pt-5">
            <div className="tile">
                <div className="tile-body">
                    <Modal />
                    <Modal.Header>
                         <Modal.Title>Cadastro de Roles para o Usuário</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <table>
                           <thead>

                           </thead>
                           <tbody>

                           </tbody>
                       </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary">Fechar</Button>
                        <Button variant="primary">Salvar</Button>
                    </Modal.Footer>
                </div>
            </div>
        </div>
    )

}

export default CadastrarRoles;