import mongoose from 'mongoose'; // Correção na importação

const SchemaUsuario = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const SchemaFavorito = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios',
            required: true,
        },
        item: {
            type: String,
            required: true,
            trim: true,
        },
        comments: [
            {
                text: {
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Criação dos modelos baseados nos schemas
const ModeloUsuario = mongoose.model('usuarios', SchemaUsuario);
const ModeloFavorito = mongoose.model('favoritos', SchemaFavorito);

export { ModeloUsuario, ModeloFavorito }; // Exportação corrigida para ESModules
