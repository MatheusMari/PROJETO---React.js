const mongoose = require('mongoose');

// URL de conexão ao MongoDB (substitua pela sua conexão se necessário)
const MONGO_URI = "mongodb://localhost:27017/meuBancoDeDados"; 

// Conectar ao MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Conectado ao MongoDB com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
