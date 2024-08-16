import { api } from "./api";

export const cadastrarTarefa = async (tarefa) => {
    try {
        const response = await api.post("/tarefas", tarefa);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar tarefa:", error);
        throw error;
    }
};

export const atualizarTarefa = async (id, tarefa) => {
    try {
        const response = await api.put(`/tarefas/${id}`, tarefa);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar tarefa com ID ${id}:`, error);
        throw error;
    }
};

export const buscarTarefas = async () => {
    try {
        const response = await api.get("/tarefas");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        throw error;
    }
};

export const buscarTarefaPeloId = async (id) => {
    try {
        const response = await api.get(`/tarefas/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar tarefa com ID ${id}:`, error);
        throw error;
    }
};

export const excluirTarefa = async (id) => {
    try {
        await api.delete(`/tarefas/${id}`);
    } catch (error) {
        console.error(`Erro ao excluir tarefa com ID ${id}:`, error);
        throw error;
    }
};