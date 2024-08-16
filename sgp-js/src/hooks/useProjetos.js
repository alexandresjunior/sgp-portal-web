import { useState, useEffect } from "react";
import { buscarProjetos, buscarProjetoPeloId } from "../servicos/projetos";

export const useProjetos = () => {
    const [projetos, setProjetos] = useState([]);
    const [projeto, setProjeto] = useState({});
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    const carregarProjetos = async () => {
        setCarregando(true);
        setErro("");
        try {
            const data = await buscarProjetos();
            setProjetos(data);
        } catch (erro) {
            setErro("Erro ao carregar projetos.");
        } finally {
            setCarregando(false);
        }
    };

    const carregarProjetoPeloId = async (id) => {
        setCarregando(true);
        setErro("");
        try {
            const data = await buscarProjetoPeloId(id);
            setProjeto(data);
        } catch (erro) {
            setErro(`Erro ao carregar usuário com ID ${id}.`);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarProjetos();
    }, []);

    return { projetos, projeto, carregarProjetos, carregarProjetoPeloId, carregando, erro };
};
