import { useState } from "react";
import { useTarefas } from "../../hooks/useTarefas";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";
import CartaoTarefa from "./CartaoTarefa";
import FormularioTarefa from "./FormularioTarefa";
import Alerta from "../../componentes/Alerta";
import Sidebar from "../../componentes/Sidebar";

function Tarefas() {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [exibirMenu, setExibirMenu] = useState(true);

    const { tarefas, carregando, erro } = useTarefas();

    return (
        <div className="d-flex">
            <Sidebar exibirMenu={exibirMenu} />
            <div className="bg-page flex-grow-1" style={{ marginLeft: !exibirMenu ? "0px" : "250px", overflowY: "auto" }}>
                <div className="page-content">
                    <Cabecalho
                        titulo={"Tarefas"}
                        textoBotao={exibirFormulario ? "Fechar" : "Nova Tarefa"}
                        exibirFormulario={exibirFormulario}
                        setExibirFormulario={setExibirFormulario}
                        exibirMenu={exibirMenu}
                        setExibirMenu={setExibirMenu}
                    />
                    {exibirFormulario && <FormularioTarefa />}
                    <div className="container mb-4">
                        {carregando && <Alerta cor={"info"} mensagem={"Carregando..."} />}
                        {erro && <Alerta cor={"danger"} mensagem={erro} />}
                        {tarefas?.map((tarefa) => (
                            <CartaoTarefa
                                key={tarefa.id}
                                id={tarefa.id}
                                titulo={tarefa.titulo}
                                descricao={tarefa.descricao}
                                prazoEntrega={tarefa.prazoEntrega}
                                definirLembrete={tarefa.definirLembrete}
                                status={tarefa.status}
                                usuario={tarefa.usuario?.nome}
                                projeto={tarefa.projeto?.nome}
                            />
                        ))}
                        {!carregando && !erro && tarefas && tarefas.length === 0 && (
                            <Alerta cor={"warning"} mensagem={"Nenhuma tarefa encontrada."} />
                        )}
                    </div>
                    <Rodape />
                </div>
            </div>
        </div>
    )
}

export default Tarefas;