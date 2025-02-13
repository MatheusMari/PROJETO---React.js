import { Router } from 'express';
import {
    adicionarFavorito,
    removerFavorito,
    listarFavoritos,
    adicionarComentario,
    removerComentario,
    listarComentarios,
    logado,
} from '../controladores/FavController.js';

const router = Router();

// Rotas dos favoritos
router.post('/adicionar', logado, adicionarFavorito);
router.delete('/remover/:itemName', logado, removerFavorito);
router.get('/listar', logado, listarFavoritos);

// Rotas dos comentários
router.post('/comentario/adicionar', logado, adicionarComentario);
router.delete('/comentario/remover/:favoritoId/:comentarioId', logado, removerComentario);
router.get('/comentario/listar/:favoritoId', logado, listarComentarios);

export default router;
