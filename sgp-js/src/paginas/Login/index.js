import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contextos/GlobalContext";
import { useUsuarios } from "../../hooks/useUsuarios";
import logo from "../../arquivos/imagens/sgp_logo_vertical.png";
import Alerta from "../../componentes/Alerta";
import "./login.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [manterConectado, setManterConectado] = useState(true);
    const [erro, setErro] = useState("");

    const navegarPara = useNavigate();

    const { login } = useContext(GlobalContext);

    const { usuarios } = useUsuarios();

    const fazerLogin = (event) => {
        event.preventDefault();

        const usuarioEncontrado = usuarios.find(
            (usuario) => usuario.email === email && usuario.senha === senha
        );

        if (usuarioEncontrado) {
            login(usuarioEncontrado, manterConectado);
            navegarPara("/tarefas");
        } else {
            setErro("Credenciais inválidas!");
        }
    };

    return (
        <div className="bg-container">
            <div className="container">
                <div className="row justify-content-center">
                    <form className="col-md-5 col-10 login-container" onSubmit={fazerLogin}>
                        <div className="row justify-content-center my-4">
                            <div className="col-8">
                                <div className="d-flex justify-content-center">
                                    <img src={logo} alt="Sistema de Gestão de Projetos" width={"200px"} />
                                </div>
                                {erro && <Alerta cor={"danger"} mensagem={erro} />}
                                <input
                                    type="text"
                                    className="form-control border border-primary mb-2"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    className="form-control border border-primary mb-2"
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                                <div className="form-check text-start my-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        defaultChecked={manterConectado}
                                        onChange={() => setManterConectado(!manterConectado)}
                                    />
                                    <label className="form-check-label text-dark">
                                        Mantenha-me conectado
                                    </label>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary mt-2 px-4">Entrar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
