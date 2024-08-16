import { useState } from "react";
import { useProjetos } from "../../hooks/useProjetos";
import Cabecalho from "../../componentes/Cabecalho";
import FormularioProjeto from "./FormularioProjeto";
import CartaoProjeto from "../Projetos/CartaoProjeto";
import Rodape from "../../componentes/Rodape";
import Alerta from "../../componentes/Alerta";
import Sidebar from "../../componentes/Sidebar";

function Projetos() {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [exibirMenu, setExibirMenu] = useState(true);

    const { projetos, carregando, erro } = useProjetos();

    return (
        <div className="d-flex">
            <Sidebar exibirMenu={exibirMenu} />
            <div className="bg-page flex-grow-1" style={{ marginLeft: !exibirMenu ? "0px" : "250px", overflowY: "auto" }}>
                <div className="page-content">
                    <Cabecalho
                        titulo={"Projetos"}
                        textoBotao={exibirFormulario ? "Fechar" : "Novo Projeto"}
                        exibirFormulario={exibirFormulario}
                        setExibirFormulario={setExibirFormulario}
                        exibirMenu={exibirMenu}
                        setExibirMenu={setExibirMenu}
                    />
                    {exibirFormulario && <FormularioProjeto />}
                    <div className="container mb-4">
                        {carregando && <Alerta cor={"info"} mensagem={"Carregando..."} />}
                        {erro && <Alerta cor={"danger"} mensagem={erro} />}
                        {projetos?.map((projeto) => (
                            <CartaoProjeto
                                key={projeto.id}
                                id={projeto.id}
                                nome={projeto.nome}
                                descricao={projeto.descricao}
                                dataInicio={projeto.dataInicio}
                                dataFim={projeto.dataFim}
                                status={projeto.status}
                                gerente={projeto.gerente}
                            />
                        ))}
                        {!carregando && !erro && projetos && projetos.length === 0 && (
                            <Alerta cor={"warning"} mensagem={"Nenhum projeto encontrado."} />
                        )}
                    </div>
                    <Rodape />
                </div>
            </div>
        </div>
    )
}

export default Projetos;