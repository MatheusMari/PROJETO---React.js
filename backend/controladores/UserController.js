import { ModeloUsuario } from '../bd/Modelos.js';
import bcrypt from 'bcrypt';

// Criar um novo usuário
export const criarUsuario = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verifica se o usuário já existe
        const usuarioExistente = await ModeloUsuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(409).json({ message: 'Usuário já existe' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria um novo usuário
        const novoUsuario = new ModeloUsuario({ name, email, password: hashedPassword });

        // Salva no banco
        await novoUsuario.save();

        // Adiciona usuário na sessão
        req.session.user = novoUsuario;

        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
};

// Deletar usuário
export const deletarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuarioDeletado = await ModeloUsuario.findByIdAndDelete(id);

        if (!usuarioDeletado) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erro ao deletar usuário' });
    }
};

// Logar usuário
export const logarUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await ModeloUsuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica a senha
        const senhaValida = await bcrypt.compare(password, usuario.password);
        if (!senhaValida) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }

        // Adiciona usuário na sessão
        req.session.user = usuario;

        res.status(200).json({ message: 'Login bem-sucedido', user: usuario });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erro ao logar usuário' });
    }
};

// Buscar sessão do usuário
export const buscarSecao = (req, res) => {
    if (req.session?.user) {
        return res.status(200).json({ user: req.session.user });
    } else {
        return res.status(404).json({ message: 'Nenhum usuário logado' });
    }
};

// Deslogar usuário
export const deslogarUsuario = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao deslogar' });
        }
        res.status(200).json({ message: 'Usuário deslogado com sucesso' });
    });
};
