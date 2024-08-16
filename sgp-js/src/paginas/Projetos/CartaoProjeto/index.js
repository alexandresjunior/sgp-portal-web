import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { excluirProjeto } from "../../../servicos/projetos";
import { useNavigate } from "react-router-dom";
import { formatarData } from "../../../utilidades";
import Botao from "../../../componentes/Botao";

function CartaoProjeto({
    id,
    nome,
    descricao,
    dataInicio,
    dataFim,
    status,
    gerente
}) {
    const navegarPara = useNavigate();

    const [exibirModal, setExibirModal] = useState(false);

    const deletarProjeto = () => {
        setExibirModal(true);
    };

    const cancelarExclusao = () => {
        setExibirModal(false);
    };

    const confirmarExclusao = async () => {
        try {
            await excluirProjeto(id);
            setExibirModal(false);
            window.location.reload();
        } catch (error) {
            alert("Ocorreu um erro ao excluir o projeto. Por favor, tente novamente.");
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
                                <h6 className="card-subtitle mb-2 text-body-secondary">Gerente: {gerente.nome}</h6>
                                <p className="card-text mb-1"><strong className="me-1">Descrição:</strong>{descricao}</p>
                                <p className="card-text mb-1"><strong className="me-1">Data de Início:</strong>{formatarData(dataInicio, "DD/MM/YYYY")}</p>
                                <p className="card-text mb-1"><strong className="me-1">Data de Fim:</strong>{formatarData(dataFim, "DD/MM/YYYY")}</p>
                                <p className="card-text mb-1"><strong className="me-1">Status:</strong>{status}</p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Botao cor={"primary"} texto={"Editar"} tamanho={"sm"} aoClicar={() => navegarPara(`/projetos/${id}`)} />
                                <Botao cor={"danger"} texto={"Excluir"} tamanho={"sm"} aoClicar={deletarProjeto} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={exibirModal} onHide={cancelarExclusao} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza de que deseja excluir este projeto?</Modal.Body>
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

export default CartaoProjeto;
