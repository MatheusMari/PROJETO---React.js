import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { criarFavorito, deletarFavorito, listarFavoritos, criarComentario, deletarComentario, listarComentarios, logado } from '../controladores/FavController.js';
import NodeCache from 'node-cache';

const router = Router();
const myCache = new NodeCache({ stdTTL: 600, checkperiod: 60 }); // Cache TTL de 10 minutos

// Middleware para validar requisições
const validarRequisicao = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Erros de validação:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Rota para listar favoritos com cache
router.get('/favoritos', logado, (req, res) => {
    const cacheKey = 'todosFavoritos'; // Chave de cache para a lista de favoritos

    // Verifica se os favoritos estão no cache
    const cachedData = myCache.get(cacheKey);
    if (cachedData) {
        console.log('Favoritos do cache');
        return res.json(cachedData); // Retorna os favoritos do cache
    }

    // Caso não tenha no cache, consulta o banco de dados
    listarFavoritos(req, res).then((data) => {
        // Armazena no cache
        myCache.set(cacheKey, data);
        console.log('Favoritos do banco');
        return res.json(data); // Retorna os favoritos
    });
});

// Rota para listar comentários de um favorito com cache
router.get('/favoritos/:favoritoId/comentarios', logado, validarRequisicao, (req, res) => {
    const cacheKey = `comentarios_${req.params.favoritoId}`; // Chave de cache para comentários do favorito

    // Verifica se os comentários estão no cache
    const cachedData = myCache.get(cacheKey);
    if (cachedData) {
        console.log('Comentários do cache');
        return res.json(cachedData); // Retorna os comentários do cache
    }

    // Caso não tenha no cache, consulta o banco de dados
    listarComentarios(req, res).then((data) => {
        // Armazena no cache
        myCache.set(cacheKey, data);
        console.log('Comentários do banco');
        return res.json(data); // Retorna os comentários
    });
});

router.post('/favoritos', logado, validarRequisicao, criarFavorito);
router.delete('/favoritos/:itemName', logado, validarRequisicao, deletarFavorito);

router.post('/favoritos/:favoritoId/comentarios', logado, validarRequisicao, criarComentario);
router.delete('/favoritos/:favoritoId/comentarios/:comentarioId', logado, validarRequisicao, deletarComentario);

export default router;
