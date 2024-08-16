import { api } from "./api";

export const cadastrarProjeto = async (projeto) => {
    try {
        const response = await api.post("/projetos", projeto);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar projeto:", error);
        throw error;
    }
};

export const atualizarProjeto = async (id, projeto) => {
    try {
        const response = await api.put(`/projetos/${id}`, projeto);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar projeto com ID ${id}:`, error);
        throw error;
    }
};

export const buscarProjetos = async () => {
    try {
        const response = await api.get("/projetos");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        throw error;
    }
};

export const buscarProjetoPeloId = async (id) => {
    try {
        const response = await api.get(`/projetos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar projeto com ID ${id}:`, error);
        throw error;
    }
};

export const excluirProjeto = async (id) => {
    try {
        await api.delete(`/projetos/${id}`);
    } catch (error) {
        console.error(`Erro ao excluir projeto com ID ${id}:`, error);
        throw error;
    }
};