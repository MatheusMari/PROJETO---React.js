import { ModeloFavorito } from '../bd/Modelos.js';

// Função para adicionar um favorito
export const adicionarFavorito = async (req, res) => {
    const { item } = req.body;
    const userId = req.session.user?._id; // Verifica se o usuário está logado

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    try {
        const novoFavorito = new ModeloFavorito({ user: userId, item });

        await novoFavorito.save();

        res.status(201).json({ message: 'Favorito adicionado com sucesso', favorito: novoFavorito });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar favorito', error: error.message });
    }
};

// Função para remover um favorito
export const removerFavorito = async (req, res) => {
    const { itemName } = req.params;

    try {
        const favorito = await ModeloFavorito.findOneAndDelete({ item: itemName });

        if (!favorito) {
            return res.status(404).json({ message: 'Favorito não encontrado' });
        }

        res.status(200).json({ message: 'Favorito removido com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao remover favorito', error: error.message });
    }
};

// Função para listar os favoritos de um usuário
export const listarFavoritos = async (req, res) => {
    const userId = req.session.user?._id;

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    try {
        const favoritos = await ModeloFavorito.find({ user: userId });

        res.status(200).json(favoritos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar favoritos', error: error.message });
    }
};

// Função para adicionar um comentário a um favorito
export const adicionarComentario = async (req, res) => {
    const { favoritoId, text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Texto do comentário é obrigatório' });
    }

    try {
        const favorito = await ModeloFavorito.findById(favoritoId);

        if (!favorito) {
            return res.status(404).json({ message: 'Favorito não encontrado' });
        }

        const novoComentario = { text, date: new Date() };
        favorito.comments.push(novoComentario);

        await favorito.save();

        res.status(201).json({ message: 'Comentário adicionado com sucesso', novoComentario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar comentário', error: error.message });
    }
};

// Função para remover um comentário de um favorito
export const removerComentario = async (req, res) => {
    const { favoritoId, comentarioId } = req.params;

    try {
        const favorito = await ModeloFavorito.findById(favoritoId);

        if (!favorito) {
            return res.status(404).json({ message: 'Favorito não encontrado' });
        }

        const comentariosFiltrados = favorito.comments.filter(comment => comment._id.toString() !== comentarioId);

        if (comentariosFiltrados.length === favorito.comments.length) {
            return res.status(404).json({ message: 'Comentário não encontrado' });
        }

        favorito.comments = comentariosFiltrados;
        await favorito.save();

        res.status(200).json({ message: 'Comentário removido com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao remover comentário', error: error.message });
    }
};

// Função para listar os comentários de um favorito
export const listarComentarios = async (req, res) => {
    const { favoritoId } = req.params;

    try {
        const favorito = await ModeloFavorito.findById(favoritoId);

        if (!favorito) {
            return res.status(404).json({ message: 'Favorito não encontrado' });
        }

        res.status(200).json(favorito.comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar comentários', error: error.message });
    }
};

// Middleware para verificar se o usuário está logado
export const logado = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    next();
};
