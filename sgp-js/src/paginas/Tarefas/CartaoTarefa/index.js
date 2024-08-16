import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { excluirTarefa } from "../../../servicos/tarefas";
import { useNavigate } from "react-router-dom";
import { formatarData } from "../../../utilidades";
import Botao from "../../../componentes/Botao";

function CartaoTarefa({
    id,
    titulo,
    descricao,
    prazoEntrega,
    definirLembrete,
    status,
    usuario,
    projeto
}) {
    const navegarPara = useNavigate();

    const [exibirModal, setExibirModal] = useState(false);

    const deletarTarefa = () => {
        setExibirModal(true);
    };

    const cancelarExclusao = () => {
        setExibirModal(false);
    };

    const confirmarExclusao = async () => {
        try {
            await excluirTarefa(id);
            setExibirModal(false);
            window.location.reload();
        } catch (error) {
            alert("Ocorreu um erro ao excluir a tarefa. Por favor, tente novamente.");
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-md-8 col-12">
                    <div className="card my-2">
                        <div className="card-body">
                            <div className="align-items-center">
                                <h5 className="card-title">
                                    {titulo}
                                    {definirLembrete && <FaBell className="text-warning ms-2" size={15} />}
                                </h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">{formatarData(prazoEntrega, "DD/MM/YYYY HH:mm")}</h6>
                                <p className="card-text mb-1">
                                    <strong className="me-1">Descrição:</strong>{descricao}
                                </p>
                                <p className="card-text mb-1">
                                    <strong className="me-1">Status:</strong>{status}
                                </p>
                                <p className="card-text mb-1">
                                    <strong className="me-1">Atribuído a:</strong>{usuario}
                                </p>
                                <p className="card-text mb-1">
                                    <strong className="me-1">Projeto:</strong>{projeto}
                                </p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Botao cor={"primary"} texto={"Editar"} tamanho={"sm"} aoClicar={() => navegarPara(`/tarefas/${id}`)} />
                                <Botao cor={"danger"} texto={"Excluir"} tamanho={"sm"} aoClicar={deletarTarefa} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={exibirModal} onHide={cancelarExclusao} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza de que deseja excluir esta tarefa?</Modal.Body>
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

export default CartaoTarefa;
