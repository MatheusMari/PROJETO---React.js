import axios from 'axios';

const API = axios.create({
    baseURL: 'https://localhost:8000',
    withCredentials: true,
});

// Função para criar um novo usuário
export const criarUsuario = async (name, email, password) => {
    try {
        const response = await API.post('/users/usuarios/', { name, email, password }); // Corrigido para /users
        return response;
    } catch (error) {
        return error.response;
    }
};

// Função para deletar um usuário
export const deletarUsuario = async (id) => {
    try {
        const response = await API.delete(`/users/usuarios/${id}`); // Corrigido para /users/:id
        return response;
    } catch (error) {
        return error.response;
    }
};

// Função para logar o usuário
export const logarUsuario = async (email, password) => {
    try {
        const response = await API.post('/users/usuarios/login', { email, password }); // Correto, conforme back-end
        return response;
    } catch (error) {
        return error.response;
    }
};

// Função para buscar a sessão do usuário
export const buscarSecao = async () => {
    try {
        const response = await API.get(`/users/usuarios/sessao`); // Corrigido para /users/sessao
        return response;
    } catch (error) {
        return error.response;
    }
};

// Função para deslogar o usuário
export const deslogarUsuario = async () => {
    try {
        const response = await API.post(`/users/usuarios/logout`); // Corrigido para POST em vez de GET
        return response;
    } catch (error) {
        return error.response;
    }
};

// Função para adicionar um favorito
export const adicionarFavorito = async (itemName) => {
    try {
        const response = await API.post('/favoritos/favoritos/adicionar', { item: itemName });
        return response;
    } catch (error) {
        return error.response;
    }
};

// Função para remover um favorito
export const removerFavorito = async (itemName) => {
    try {
        const response = await API.delete(`/favoritos/favoritos/remover/${itemName}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

// Função para listar favoritos
export const listarFavoritos = async () => {
    try {
        const response = await API.get(`/favoritos/favoritos/listar`);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

// Função para adicionar um comentário a um favorito
export const adicionarComentario = async (favoritoId, text) => {
    try {
        const response = await API.post('/favoritos/favoritos/comentario/adicionar', { favoritoId, text });
        return response;
    } catch (error) {
        return error.response;
    }
};

// Função para remover um comentário de um favorito
export const removerComentario = async (favoritoId, comentarioId) => {
    try {
        const response = await API.delete(`/favoritos/favoritos/comentario/remover/${favoritoId}/${comentarioId}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

// Função para listar os comentários de um favorito
export const listarComentarios = async (favoritoId) => {
    try {
        const response = await API.get(`/favoritos/favoritos/comentario/listar/${favoritoId}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}