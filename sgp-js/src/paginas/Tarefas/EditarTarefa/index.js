import { useParams } from "react-router-dom";
import { useTarefas } from "../../../hooks/useTarefas";
import { useEffect, useState } from "react";
import Cabecalho from "../../../componentes/Cabecalho";
import FormularioTarefa from "../FormularioTarefa";
import Rodape from "../../../componentes/Rodape";
import Alerta from "../../../componentes/Alerta";
import Sidebar from "../../../componentes/Sidebar";

function EditarTarefa() {
    const { id } = useParams();

    const [exibirMenu, setExibirMenu] = useState(true);

    const { carregarTarefaPeloId, tarefa, carregando, erro } = useTarefas();

    useEffect(() => {
        carregarTarefaPeloId(id);
    }, [id]);

    return (
        <div className="d-flex">
            <Sidebar exibirMenu={exibirMenu} />
            <div className="bg-page flex-grow-1" style={{ marginLeft: !exibirMenu ? "0px" : "250px", overflowY: "auto" }}>
                <div className="page-content">
                    <Cabecalho
                        titulo={"Editar Tarefa"}
                        exibirMenu={exibirMenu}
                        setExibirMenu={setExibirMenu}
                    />
                    <div className="container mb-4">
                        {carregando && <Alerta cor={"info"} mensagem={"Carregando..."} />}
                        {erro && <Alerta cor={"danger"} mensagem={erro} />}
                        {tarefa && <FormularioTarefa tarefa={tarefa} />}
                    </div>
                    <Rodape />
                </div>
            </div>
        </div>
    );
}

export default EditarTarefa;