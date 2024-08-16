import { useState } from "react";
import { useUsuarios } from "../../hooks/useUsuarios";
import Cabecalho from "../../componentes/Cabecalho";
import FormularioUsuario from "./FormularioUsuario";
import CartaoUsuario from "../Usuarios/CartaoUsuario";
import Rodape from "../../componentes/Rodape";
import Alerta from "../../componentes/Alerta";
import Sidebar from "../../componentes/Sidebar";

function Usuarios() {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [exibirMenu, setExibirMenu] = useState(true);

    const { usuarios, carregando, erro } = useUsuarios();

    return (
        <div className="d-flex">
            <Sidebar exibirMenu={exibirMenu} />
            <div className="bg-page flex-grow-1" style={{ marginLeft: !exibirMenu ? "0px" : "250px", overflowY: "auto" }}>
                <div className="page-content">
                    <Cabecalho
                        titulo={"Usuários"}
                        textoBotao={exibirFormulario ? "Fechar" : "Novo Usuário"}
                        exibirFormulario={exibirFormulario}
                        setExibirFormulario={setExibirFormulario}
                        exibirMenu={exibirMenu}
                        setExibirMenu={setExibirMenu}
                    />
                    {exibirFormulario && <FormularioUsuario />}
                    <div className="container mb-4">
                        {carregando && <Alerta cor={"info"} mensagem={"Carregando..."} />}
                        {erro && <Alerta cor={"danger"} mensagem={erro} />}
                        {usuarios?.map((usuario) => (
                            <CartaoUsuario
                                key={usuario.id}
                                id={usuario.id}
                                nome={usuario.nome}
                                email={usuario.email}
                                dataNascimento={usuario.dataNascimento}
                                telefone={usuario.telefone}
                                endereco={usuario.endereco}
                                ocupacao={usuario.ocupacao}
                                empresa={usuario.empresa}
                            />
                        ))}
                        {!carregando && !erro && usuarios && usuarios.length === 0 && (
                            <Alerta cor={"warning"} mensagem={"Nenhum usuário encontrado."} />
                        )}
                    </div>
                    <Rodape />
                </div>
            </div>
        </div>
    )
}

export default Usuarios;
