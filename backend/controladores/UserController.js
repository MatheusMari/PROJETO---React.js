import { ModeloUsuario } from '../bd/Modelos.js';
import bcrypt from 'bcrypt';

// Função para criar um novo usuário
export const criarUsuario = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verifica se os campos foram fornecidos
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        // Verifica se o usuário já existe
        const usuarioExistente = await ModeloUsuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(409).json({ message: 'Usuário já existe' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria um novo usuário
        const novoUsuario = new ModeloUsuario({ name, email, password: hashedPassword });

        // Salva o usuário no banco de dados
        await novoUsuario.save();

        // Adiciona usuário na sessão
        req.session.user = novoUsuario;

        console.log(novoUsuario);

        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
};

// Função para deletar um usuário
export const deletarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        // Verifica se o ID fornecido é válido
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const usuarioDeletado = await ModeloUsuario.findByIdAndDelete(id);

        if (!usuarioDeletado) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erro ao deletar usuário', error: error.message });
    }
};

// Função para logar um usuário
export const logarUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        // Verifica se o usuário existe
        const usuario = await ModeloUsuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica a senha
        const senhaValida = await bcrypt.compare(password, usuario.password);
        if (!senhaValida) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        // Adiciona usuário na sessão
        req.session.user = usuario;

        res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erro ao logar usuário', error: error.message });
    }
};

// Função para buscar usuário na sessão
export const buscarSecao = (req, res) => {
    try {
        if (req.session?.user) {
            return res.status(200).json({ user: req.session.user });
        } else {
            return res.status(404).json({ message: 'Nenhum usuário logado' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erro ao buscar sessão', error: error.message });
    }
};

// Função para deslogar usuário
export const deslogarUsuario = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: 'Erro ao destruir sessão', error: err.message });
            }

            res.status(200).json({ message: 'Usuário deslogado com sucesso' });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Erro ao deslogar usuário', error: error.message });
    }
};
