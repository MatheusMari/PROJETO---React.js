import React, { createContext, useContext, useState, useEffect } from 'react';
import { criarUsuario, logarUsuario, deletarUsuario, buscarSecao, deslogarUsuario } from '../Backend/Servidor.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const pegarUsuario = async () => {
            setLoading(true);
            try {
                const response = await buscarSecao();
                if (response.status === 200) {
                    setUser(response.data);
                } else {
                    setError('Não foi possível recuperar os dados do usuário.');
                }
            } catch (err) {
                setError(err.response ? err.response.data : "Erro desconhecido ao tentar buscar o usuário.");
            } finally {
                setLoading(false);
            }
        };

        pegarUsuario();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await logarUsuario(email, password);
            if (response.status === 200) {
                setUser(response.data);
            } else {
                setError('Credenciais inválidas.');
            }

            return response;
        } catch (err) {
            setError(err.response ? err.response.data : "Erro desconhecido durante login.");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await deslogarUsuario();
            setUser(null);
        } catch (err) {
            setError(err.response ? err.response.data : "Erro desconhecido durante logout.");
        } finally {
            setLoading(false);
        }
    };

    const deletar = async (id) => {
        setLoading(true);
        try {
            await deletarUsuario(id);
            setUser(null);
        } catch (err) {
            setError(err.response ? err.response.data : "Erro desconhecido ao tentar deletar o usuário.");
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        try {
            const response = await criarUsuario(name, email, password);

            if (response.status === 400) {
                throw new Error("Por favor, preencha todos os campos!");
            } else if (response.status === 499) {
                throw new Error("Usuário já existe.");
            }

            setUser(response.data);
            return response;
        } catch (err) {
            setError(err.response ? err.response.data : err.message || "Erro desconhecido durante registro.");
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
