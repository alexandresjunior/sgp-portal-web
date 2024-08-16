import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../contextos/GlobalContext';
import Login from '../paginas/Login';
import Usuarios from '../paginas/Usuarios';
import EditarUsuario from '../paginas/Usuarios/EditarUsuario';
import Projetos from '../paginas/Projetos';
import EditarProjeto from '../paginas/Projetos/EditarProjeto';
import Tarefas from '../paginas/Tarefas';
import EditarTarefa from '../paginas/Tarefas/EditarTarefa';
import PaginaNaoEncontrada from '../paginas/PaginaNaoEncontrada';

function Rotas() {
    const { usuarioLogado } = useContext(GlobalContext);

    const verificarRedirecionamento = (Page) => {
        if (!usuarioLogado) {
            return <Navigate to="/" />;
        }

        return Page;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="/usuarios" element={verificarRedirecionamento(<Usuarios />)} />
                <Route path="/usuarios/:id" element={verificarRedirecionamento(<EditarUsuario />)} />
                <Route path="/projetos" element={verificarRedirecionamento(<Projetos />)} />
                <Route path="/projetos/:id" element={verificarRedirecionamento(<EditarProjeto />)} />
                <Route path="/tarefas" element={verificarRedirecionamento(<Tarefas />)} />
                <Route path="/tarefas/:id" element={verificarRedirecionamento(<EditarTarefa />)} />
                <Route path="*" element={<PaginaNaoEncontrada />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;