import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import { criarUsuario, deletarUsuario, logarUsuario, buscarSecao, deslogarUsuario } from '../controladores/UserController.js';
import NodeCache from 'node-cache';

const router = Router();
const myCache = new NodeCache({ stdTTL: 600, checkperiod: 60 }); // Cache TTL de 10 minutos

// Middleware para validar IDs do MongoDB
const validarId = [
    param('id').isMongoId().withMessage('ID inválido')
];

// Middleware para validar requisições
const validarRequisicao = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      console.log("Erros de validação:", errors.array());
      return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Rota para buscar a sessão com cache
router.get('/usuarios/sessao', (req, res) => {
    const cacheKey = 'usuarioSessao'; // Chave de cache para sessão do usuário

    // Verifica se a sessão está no cache
    const cachedData = myCache.get(cacheKey);
    if (cachedData) {
        console.log('Dados da sessão do cache');
        return res.json(cachedData); // Retorna os dados da sessão do cache
    }

    // Caso não tenha no cache, consulta o banco de dados
    buscarSecao(req, res).then((data) => {
        // Armazena no cache
        myCache.set(cacheKey, data);
        console.log('Dados da sessão do banco');
        return res.json(data); // Retorna os dados da sessão
    });
});

router.post('/usuarios',
    [
      body('name')
          .trim().escape().isString().notEmpty().withMessage('Nome é obrigatório'),
      body('email')
          .trim().isEmail().normalizeEmail().withMessage('Email inválido'),
      body('password')
          .trim().isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
  ],
  validarRequisicao,
  criarUsuario
);

router.delete('/usuarios/:id', validarId, validarRequisicao, deletarUsuario);

router.post('/usuarios/login',
    [
        body('email').isEmail().withMessage('Email inválido'),
        body('password').notEmpty().withMessage('Senha obrigatória')
    ],
    validarRequisicao,
    logarUsuario
);

router.post('/usuarios/logout', deslogarUsuario);

export default router;
