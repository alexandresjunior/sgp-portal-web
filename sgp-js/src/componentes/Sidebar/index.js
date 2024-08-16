import { useNavigate, useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../contextos/GlobalContext";
import { FaProjectDiagram, FaTasks, FaUserFriends } from "react-icons/fa";
import Botao from "../Botao";
import logo from "../../arquivos/imagens/sgp_logo_horizontal.png";

const Sidebar = ({ exibirMenu }) => {
    const navegarPara = useNavigate();
    const localizacao = useLocation();

    const { logout } = useContext(GlobalContext);

    const fazerLogout = () => {
        logout();
        navegarPara("/");
    };

    const paginaAtualEh = (path) => localizacao.pathname.startsWith(path);

    return (
        <div className={`sidebar d-flex flex-column p-3 ${!exibirMenu && 'd-none d-md-block'}`} style={{ width: "250px", height: "100vh", position: "fixed" }}>
            <img src={logo} alt="Sistema de Gestão de Projetos" />
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/tarefas" className={`nav-link ${paginaAtualEh("/tarefas") ? "active" : "text-dark"}`} aria-current="page">
                        <div className="d-flex align-items-center">
                            <FaTasks size={15} />
                            <span className="ms-2">Tarefas</span>
                        </div>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/projetos" className={`nav-link ${paginaAtualEh("/projetos") ? "active" : "text-dark"}`}>
                        <div className="d-flex align-items-center">
                            <FaProjectDiagram size={15} />
                            <span className="ms-2">Projetos</span>
                        </div>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/usuarios" className={`nav-link ${paginaAtualEh("/usuarios") ? "active" : "text-dark"}`}>
                        <div className="d-flex align-items-center">
                            <FaUserFriends size={15} />
                            <span className="ms-2">Usuários</span>
                        </div>
                    </Link>
                </li>
            </ul>
            <hr />
            <Botao cor={"primary"} texto={"Logout"} aoClicar={fazerLogout} />
        </div>
    );
}

export default Sidebar;
