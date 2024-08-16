import { api } from "./api";

export const cadastrarUsuario = async (usuario) => {
    try {
        const response = await api.post("/usuarios", usuario);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        throw error;
    }
};

export const atualizarUsuario = async (id, usuario) => {
    try {
        const response = await api.put(`/usuarios/${id}`, usuario);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar usuário com ID ${id}:`, error);
        throw error;
    }
};

export const buscarUsuarios = async () => {
    try {
        const response = await api.get("/usuarios");
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        throw error;
    }
};

export const buscarUsuarioPeloId = async (id) => {
    try {
        const response = await api.get(`/usuarios/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar usuário com ID ${id}:`, error);
        throw error;
    }
};

export const excluirUsuario = async (id) => {
    try {
        await api.delete(`/usuarios/${id}`);
    } catch (error) {
        console.error(`Erro ao excluir usuário com ID ${id}:`, error);
        throw error;
    }
};