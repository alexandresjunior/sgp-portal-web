import { useState, useEffect } from "react";
import { buscarTarefas, buscarTarefaPeloId } from "../servicos/tarefas";

export const useTarefas = () => {
    const [tarefas, setTarefas] = useState([]);
    const [tarefa, setTarefa] = useState({});
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    const carregarTarefas = async () => {
        setCarregando(true);
        setErro("");
        try {
            const data = await buscarTarefas();
            setTarefas(data);
        } catch (erro) {
            setErro("Erro ao carregar tarefas.");
        } finally {
            setCarregando(false);
        }
    };

    const carregarTarefaPeloId = async (id) => {
        setCarregando(true);
        setErro("");
        try {
            const data = await buscarTarefaPeloId(id);
            setTarefa(data);
        } catch (erro) {
            setErro(`Erro ao carregar usuário com ID ${id}.`);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarTarefas();
    }, []);

    return { tarefas, tarefa, carregarTarefas, carregarTarefaPeloId, carregando, erro };
};
