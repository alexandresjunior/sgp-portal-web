import { useState, useEffect } from "react";
import { buscarUsuarios, buscarUsuarioPeloId } from "../servicos/usuarios";

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState({});
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    const carregarUsuarios = async () => {
        setCarregando(true);
        setErro("");
        try {
            const data = await buscarUsuarios();
            setUsuarios(data);
        } catch (erro) {
            setErro("Erro ao carregar usuários.");
        } finally {
            setCarregando(false);
        }
    };

    const carregarUsuarioPeloId = async (id) => {
        setCarregando(true);
        setErro("");
        try {
            const data = await buscarUsuarioPeloId(id);
            setUsuario(data);
        } catch (erro) {
            setErro(`Erro ao carregar usuário com ID ${id}.`);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    return { usuarios, usuario, carregarUsuarios, carregarUsuarioPeloId, carregando, erro };
};
