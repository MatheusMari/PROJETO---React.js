import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo de 100 requisições por IP dentro do tempo definido
    message: { message: 'Muitas requisições. Tente novamente mais tarde.' },
    standardHeaders: true, // Retorna rate limit nos headers
    legacyHeaders: false, // Desativa os headers X-RateLimit
});
