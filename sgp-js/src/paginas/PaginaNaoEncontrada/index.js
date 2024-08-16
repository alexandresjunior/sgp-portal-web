import { useState } from "react";
import Alerta from "../../componentes/Alerta";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";
import imagem from "../../arquivos/imagens/robo_404.png";
import Sidebar from "../../componentes/Sidebar";

function PaginaNaoEncontrada() {
    const [exibirMenu, setExibirMenu] = useState(true);

    return (
        <div className="d-flex">
            <Sidebar exibirMenu={exibirMenu} />
            <div className="bg-page flex-grow-1" style={{ marginLeft: !exibirMenu ? "0px" : "250px", overflowY: "auto" }}>
                <div className="page-content">
                    <Cabecalho
                        titulo={"Erro 404"}
                        exibirMenu={exibirMenu}
                        setExibirMenu={setExibirMenu}
                    />
                    <div className="container mb-4">
                        <Alerta cor={"danger"} mensagem={"Esta página não existe!"} />
                        <div className="d-flex justify-content-center">
                            <img src={imagem} alt="Página não encontrada." />
                        </div>
                    </div>
                    <Rodape />
                </div>
            </div>
        </div>
    )
}

export default PaginaNaoEncontrada;