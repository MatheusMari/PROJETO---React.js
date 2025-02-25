import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c95ad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// Conectar ao banco de dados
mongoose
    .connect(uri, {
        socketTimeoutMS: 45000, // Tempo máximo de inatividade da conexão antes de ser fechada
        serverSelectionTimeoutMS: 5000, // Timeout para selecionar o servidor
    })
    .then(() => console.log('Conectado ao banco de dados com sucesso!'))
    .catch((error) => console.error('Erro ao conectar ao banco de dados:', error));

export default mongoose; // Exportação para uso em outros arquivos
