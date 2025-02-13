import { Router } from 'express';
import {
  criarUsuario,
  deletarUsuario,
  logarUsuario,
  buscarSecao,
  deslogarUsuario,
} from '../controladores/UserController.js';

const router = Router();

// Middleware para validar IDs do MongoDB
const validarId = (req, res, next) => {
    const { id } = req.params;
    
    if (id && !id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    next();
};

// Rotas de usuário
router.post('/criar', criarUsuario);
router.delete('/deletar/:id', validarId, deletarUsuario);
router.post('/login', logarUsuario);
router.get('/secao', buscarSecao);
router.get('/logout', deslogarUsuario);

export default router;
