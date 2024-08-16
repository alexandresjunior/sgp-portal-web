import { useParams } from "react-router-dom";
import { useUsuarios } from "../../../hooks/useUsuarios";
import { useEffect, useState } from "react";
import Cabecalho from "../../../componentes/Cabecalho";
import FormularioUsuario from "../FormularioUsuario";
import Rodape from "../../../componentes/Rodape";
import Alerta from "../../../componentes/Alerta";
import Sidebar from "../../../componentes/Sidebar";

function EditarUsuario() {
    const { id } = useParams();

    const [exibirMenu, setExibirMenu] = useState(true);

    const { carregarUsuarioPeloId, usuario, carregando, erro } = useUsuarios();

    useEffect(() => {
        carregarUsuarioPeloId(id);
    }, [id]);

    return (
        <div className="d-flex">
            <Sidebar exibirMenu={exibirMenu} />
            <div className="bg-page flex-grow-1" style={{ marginLeft: !exibirMenu ? "0px" : "250px", overflowY: "auto" }}>
                <div className="page-content">
                    <Cabecalho
                        titulo={"Editar Usuário"}
                        exibirMenu={exibirMenu}
                        setExibirMenu={setExibirMenu}
                    />
                    <div className="container mb-4">
                        {carregando && <Alerta cor={"info"} mensagem={"Carregando..."} />}
                        {erro && <Alerta cor={"danger"} mensagem={erro} />}
                        {usuario && !carregando && !erro && <FormularioUsuario usuario={usuario} />}
                    </div>
                    <Rodape />
                </div>
            </div>
        </div>
    );
}

export default EditarUsuario;