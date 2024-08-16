import { useParams } from "react-router-dom";
import { useProjetos } from "../../../hooks/useProjetos";
import { useEffect, useState } from "react";
import Cabecalho from "../../../componentes/Cabecalho";
import FormularioProjeto from "../FormularioProjeto";
import Rodape from "../../../componentes/Rodape";
import Alerta from "../../../componentes/Alerta";
import Sidebar from "../../../componentes/Sidebar";

function EditarProjeto() {
    const { id } = useParams();

    const [exibirMenu, setExibirMenu] = useState(true);

    const { carregarProjetoPeloId, projeto, carregando, erro } = useProjetos();

    useEffect(() => {
        carregarProjetoPeloId(id);
    }, [id]);

    return (
        <div className="d-flex">
            <Sidebar exibirMenu={exibirMenu} />
            <div className="bg-page flex-grow-1" style={{ marginLeft: !exibirMenu ? "0px" : "250px", overflowY: "auto" }}>
                <div className="page-content">
                    <Cabecalho
                        titulo={"Editar Projeto"}
                        exibirMenu={exibirMenu}
                        setExibirMenu={setExibirMenu}
                    />
                    <div className="container mb-4">
                        {carregando && <Alerta cor={"info"} mensagem={"Carregando..."} />}
                        {erro && <Alerta cor={"danger"} mensagem={erro} />}
                        {projeto && <FormularioProjeto projeto={projeto} />}
                    </div>
                    <Rodape />
                </div>
            </div>
        </div>
    );
}

export default EditarProjeto;