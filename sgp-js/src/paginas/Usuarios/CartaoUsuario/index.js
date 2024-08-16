import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { excluirUsuario } from "../../../servicos/usuarios";
import { useNavigate } from "react-router-dom";
import { formatarData } from "../../../utilidades";
import Botao from "../../../componentes/Botao";

function CartaoUsuario({
    id,
    nome,
    email,
    dataNascimento,
    telefone,
    endereco,
    ocupacao,
    empresa
}) {
    const navegarPara = useNavigate();

    const [exibirModal, setExibirModal] = useState(false);

    const deletarUsuario = () => {
        setExibirModal(true);
    };

    const cancelarExclusao = () => {
        setExibirModal(false);
    };

    const confirmarExclusao = async () => {
        try {
            await excluirUsuario(id);
            setExibirModal(false);
            window.location.reload();
        } catch (error) {
            alert("Ocorreu um erro ao excluir o usuário. Por favor, tente novamente.");
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-md-8 col-12">
                    <div className="card my-2">
                        <div className="card-body">
                            <div className="align-items-center">
                                <h5 className="card-title">{nome}</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">{email}</h6>
                                <p className="card-text mb-1">
                                    <strong className="me-1">Data de Nascimento:</strong>{formatarData(dataNascimento, "DD/MM/YYYY")}
                                </p>
                                <p className="card-text mb-1">
                                    <strong className="me-1">Telefone:</strong>{telefone}
                                </p>
                                <p className="card-text mb-1">
                                    <strong className="me-1">Endereço:</strong>{endereco.rua}, {endereco.numero} - {endereco.cidade}, {endereco.estado}, {endereco.cep}
                                </p>
                                <p className="card-text mb-1">
                                    <strong className="me-1">Ocupação:</strong>{ocupacao}
                                </p>
                                <p className="card-text mb-1">
                                    <strong className="me-1">Empresa:</strong>{empresa}
                                </p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Botao cor={"primary"} texto={"Editar"} tamanho={"sm"} aoClicar={() => navegarPara(`/usuarios/${id}`)} />
                                <Botao cor={"danger"} texto={"Excluir"} tamanho={"sm"} aoClicar={deletarUsuario} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={exibirModal} onHide={cancelarExclusao} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza de que deseja excluir este usuário?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelarExclusao}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmarExclusao}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CartaoUsuario;
