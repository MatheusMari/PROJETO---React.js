import express from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import favoritosRouter from './routes/favoritos.js';
import './bd/Servidor.js';

dotenv.config(); // Carrega variáveis de ambiente

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuração do CORS para permitir credenciais
app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true
}));

// Configuração de sessão
app.use(session({
	secret: process.env.SESSION_SECRET || 'segredo_muito_secreto',
	resave: false,
	saveUninitialized: true,
	cookie: { 
		maxAge: 3600000, 
		sameSite: 'lax', 
		secure: process.env.NODE_ENV === 'production' // Apenas em HTTPS
	}
}));

// Rotas
app.use('/users', usersRouter);
app.use('/favoritos', favoritosRouter);

// Tratamento de erro 404
app.use((req, res, next) => {
	next(createError(404, 'Rota não encontrada'));
});

// Middleware de erro
app.use((err, req, res, next) => {
	console.error(err.stack); // Log do erro no servidor

	res.status(err.status || 500).json({
		message: err.message || 'Erro interno do servidor',
		error: process.env.NODE_ENV === 'development' ? err : {}
	});
});

// Iniciando servidor
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`🚀 Servidor rodando na porta ${port}`);
});
