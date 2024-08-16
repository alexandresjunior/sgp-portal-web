import React, { useContext, useState } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { GlobalContext } from '../../contextos/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Botao from '../Botao';
import logo from "../../arquivos/imagens/sgp_logo_horizontal.png";

const MenuLateral = () => {
    const [exibirMenu, setExibirMenu] = useState(false);

    const navegarPara = useNavigate();

    const { logout } = useContext(GlobalContext);

    const fazerLogout = () => {
        logout();
        navegarPara("/");
    };

    return (
        <>
            <Botao
                cor={"primary"}
                texto="Menu"
                aoClicar={() => setExibirMenu(true)}
            />
            <Offcanvas show={exibirMenu} onHide={() => setExibirMenu(false)} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <img src={logo} alt="Sistema de Gestão de Projetos" width={"200px"} />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        <ListGroup.Item
                            action
                            onClick={() => {
                                navegarPara("/usuarios");
                                setExibirMenu(false);
                            }}
                        >
                            Usuários
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            onClick={() => {
                                navegarPara("/projetos");
                                setExibirMenu(false);
                            }}
                        >
                            Projetos
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            onClick={() => {
                                navegarPara("/tarefas");
                                setExibirMenu(false);
                            }}
                        >
                            Tarefas
                        </ListGroup.Item>
                    </ListGroup>
                    <Button variant="primary mt-3" onClick={fazerLogout}>
                        Logout
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default MenuLateral;
