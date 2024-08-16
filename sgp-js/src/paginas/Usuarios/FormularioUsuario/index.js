import { useEffect, useState } from "react";
import { atualizarUsuario, cadastrarUsuario } from "../../../servicos/usuarios";
import { useNavigate } from "react-router-dom";
import { buscarDetalhesEndereco } from "../../../servicos/cep";
import Alerta from "../../../componentes/Alerta";

function FormularioUsuario({ usuario }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confSenha, setConfSenha] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [telefone, setTelefone] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [cep, setCep] = useState("");
    const [ocupacao, setOcupacao] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [erro, setErro] = useState("");

    const navegarPara = useNavigate();

    useEffect(() => {
        if (usuario) {
            setNome(usuario.nome || "");
            setEmail(usuario.email || "");
            setSenha(usuario.senha || "");
            setConfSenha(usuario.confSenha || "");
            setDataNascimento(usuario.dataNascimento || "");
            setTelefone(usuario.telefone || "");
            setOcupacao(usuario.ocupacao || "");
            setEmpresa(usuario.empresa || "");
            setCep(usuario.endereco?.cep || "");
            setRua(usuario.endereco?.rua || "");
            setNumero(usuario.endereco?.numero || "");
            setCidade(usuario.endereco?.cidade || "");
            setEstado(usuario.endereco?.estado || "");
        }
    }, [usuario]);

    useEffect(() => {
        const buscarEndereco = async () => {
            if (cep.length === 8) {
                try {
                    const endereco = await buscarDetalhesEndereco(cep);
                    setRua(endereco.rua);
                    setCidade(endereco.cidade);
                    setEstado(endereco.estado);
                    setErro("");
                } catch (error) {
                    setErro(error.message);
                }
            }
        };

        buscarEndereco();
    }, [cep]);

    const submeterFormulario = async (event) => {
        event.preventDefault();

        const dadosUsuario = {
            nome,
            email,
            senha,
            confSenha,
            dataNascimento,
            telefone,
            endereco: {
                rua,
                numero,
                cidade,
                estado,
                cep,
            },
            ocupacao,
            empresa,
        };

        try {
            if (usuario && usuario.id) {
                await atualizarUsuario(usuario.id, dadosUsuario);
                alert("Usuário atualizado com sucesso!");
                navegarPara("/usuarios");
            } else {
                await cadastrarUsuario(dadosUsuario);
                alert("Usuário cadastrado com sucesso!");
                window.location.reload();
            }
        } catch (error) {
            alert("Ocorreu um erro ao salvar o usuário. Por favor, tente novamente.");
        }
    };

    return (
        <div className="container mb-4">
            <form className="row g-3 justify-content-center" onSubmit={submeterFormulario}>
                {erro && <Alerta cor={"warning"} mensagem={erro} />}
                <div className="col-md-8 col-12">
                    <div className="row g-3 d-flex">
                        <div className="col-lg-6 col-12">
                            <label htmlFor="nome" className="form-label">
                                Nome:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <label htmlFor="email" className="form-label">
                                Email:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <label htmlFor="senha" className="form-label">
                                Senha:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="senha"
                                value={senha}
                                onChange={(event) => setSenha(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <label htmlFor="confSenha" className="form-label">
                                Confirme a Senha:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confSenha"
                                value={confSenha}
                                onChange={(event) => setConfSenha(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <label htmlFor="dataNascimento" className="form-label">
                                Data de Nascimento:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="dataNascimento"
                                value={dataNascimento}
                                onChange={(event) => setDataNascimento(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <label htmlFor="telefone" className="form-label">
                                Telefone:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="telefone"
                                value={telefone}
                                onChange={(event) => setTelefone(event.target.value)}
                                required
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <label htmlFor="ocupacao" className="form-label">
                                Ocupação:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="ocupacao"
                                value={ocupacao}
                                onChange={(event) => setOcupacao(event.target.value)}
                            />
                        </div>
                        <div className="col-lg-6 col-12">
                            <label htmlFor="empresa" className="form-label">
                                Empresa:
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="empresa"
                                value={empresa}
                                onChange={(event) => setEmpresa(event.target.value)}
                            />
                        </div>
                        <div className="col-lg-4 col-12">
                            <label htmlFor="cep" className="form-label">
                                CEP:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="cep"
                                value={cep}
                                onChange={(event) => setCep(event.target.value)}
                            />
                        </div>
                        <div className="col-lg-8 col-12">
                            <label htmlFor="rua" className="form-label">
                                Rua:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="rua"
                                value={rua}
                                onChange={(event) => setRua(event.target.value)}
                            />
                        </div>
                        <div className="col-lg-4 col-12">
                            <label htmlFor="numero" className="form-label">
                                Número:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="numero"
                                value={numero}
                                onChange={(event) => setNumero(event.target.value)}
                            />
                        </div>
                        <div className="col-lg-4 col-12">
                            <label htmlFor="cidade" className="form-label">
                                Cidade:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="cidade"
                                value={cidade}
                                onChange={(event) => setCidade(event.target.value)}
                            />
                        </div>
                        <div className="col-lg-4 col-12">
                            <label htmlFor="estado" className="form-label">
                                Estado:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="estado"
                                value={estado}
                                onChange={(event) => setEstado(event.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <button className="btn btn-success mt-3 w-100" type="submit">Salvar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormularioUsuario;
