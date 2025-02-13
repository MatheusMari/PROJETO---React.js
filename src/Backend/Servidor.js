import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

export const criarUsuario = async (name, email, password) => {
    try {
        const response = await API.post('/users/criar', { name, email, password });

        return response;
    } catch (error) {
        return error.response;
    }
}

export const deletarUsuario = async (id) => {
    try {
        const response = await API.delete(`/users/deletar/${id}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const logarUsuario = async (email, password) => {
    try {
        const response = await API.post('/users/login', { email, password });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const buscarSecao = async () => {
    try {
        const response = await API.get(`/users/secao`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const deslogarUsuario = async () => {
    try {
        const response = await API.get(`/users/logout`);
        console.log(response);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const adicionarFavorito = async (itemName) => {
    try {
        const response = await API.post('/favoritos/adicionar', { item: itemName });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const removerFavorito = async (itemName) => {
    try {
        const response = await API.delete(`/favoritos/remover/${itemName}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const listarFavoritos = async () => {
    try {
        const response = await API.get(`/favoritos/listar`);
        return response.data;
    } catch (error) {
        return error.response;
    }
};

export const adicionarComentario = async (favoritoId, text) => {
    try {
        const response = await API.post('/favoritos/comentario/adicionar', { favoritoId, text });
        return response;
    } catch (error) {
        return error.response;
    }
};

export const removerComentario = async (favoritoId, comentarioId) => {
    try {
        const response = await API.delete(`/favoritos/comentario/remover/${favoritoId}/${comentarioId}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const listarComentarios = async (favoritoId) => {
    try {
        const response = await API.get(`/favoritos/comentario/listar/${favoritoId}`);
        return response.data;
    } catch (error) {
        return error.response;
    }
}