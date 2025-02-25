import express from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import favoritosRouter from './routes/favoritos.js';
import { limiter } from './middleware/rateLimiter.js';
import compression from 'compression';
import fs from 'fs';
import https from 'https';
import './bd/Servidor.js';

dotenv.config(); // Carrega variáveis de ambiente

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(limiter);
app.use(compression());

// Configuração do CORS para permitir credenciais
app.use(cors({
	origin: [
		'http://localhost:3000',  // Permite HTTP
		'https://localhost:3000'  // Permite HTTPS
	],
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
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/favoritos', favoritosRouter);

// Tratamento de erro 404
app.use((req, res, next) => {
	next(createError(404, 'Rota não encontrada'));
});

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});

// Middleware de erro
app.use((err, req, res, next) => {
	console.error(err.stack); // Log do erro no servidor

	res.status(err.status || 500).json({
		message: err.message || 'Erro interno do servidor',
		error: process.env.NODE_ENV === 'development' ? err : {}
	});
});

// Carregar os arquivos do certificado
const options = {
  key: fs.readFileSync('./ssl/private.key'),
  cert: fs.readFileSync('./ssl/cert.crt')
};

// Iniciando servidor HTTPS
const port = process.env.PORT || 8000;
https.createServer(options, app).listen(port, () => {
	console.log(`🚀 Servidor HTTPS rodando na porta ${port}`);
});
