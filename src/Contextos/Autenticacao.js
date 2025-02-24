import React, { createContext, useContext, useState, useEffect} from 'react';
import { criarUsuario, logarUsuario, deletarUsuario, buscarSecao, deslogarUsuario } from '../Backend/Servidor.js';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const pegarUsuario = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await buscarSecao();
                if (response.status === 200) {
                    setUser(response.data.user);
                } else {
                    setError(response.data.message || 'Erro ao recuperar o usuário.');
                }
            } catch (err) {
                setError(err.response?.data?.message || "Erro desconhecido ao buscar usuário.");
            } finally {
                setLoading(false);
            }
        };

        pegarUsuario();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await logarUsuario(email, password);
            if (response.status === 200) {
                setUser(response.data.user);
                return response; // Adicionando retorno da resposta
            } else {
                setError(response.data.message || 'Credenciais inválidas.');
            }
        } catch (err) {
            setError(err.response?.data?.message || "Erro desconhecido durante login.");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await deslogarUsuario();
            setUser(null);
        } catch (err) {
            setError(err.response?.data?.message || "Erro desconhecido durante logout.");
        } finally {
            setLoading(false);
        }
    };

    const deletar = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await deletarUsuario(id);
            setUser(null);
        } catch (err) {
            setError(err.response?.data?.message || "Erro desconhecido ao tentar deletar o usuário.");
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await criarUsuario(name, email, password);
            setUser(response.data.user);
            return response;
        } catch (err) {
            setError(err.response?.data?.message || "Erro desconhecido durante registro.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout, register, deletar }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
