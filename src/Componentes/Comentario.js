import React, { useEffect, useState } from "react";
import { adicionarComentario, removerComentario, listarComentarios } from "../Backend/Servidor.js";

const Comentario = ({ favoritoId, comentarios }) => {
    const [text, setText] = useState("");
    const [comentariosList, setComentariosList] = useState(comentarios);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const response = await listarComentarios(favoritoId);
                setComentariosList(response);
            } catch (error) {
                console.error("Erro ao carregar comentários:", error);
            }
        };

        fetchComentarios();
    }, [favoritoId]); // Recarregar comentários sempre que favoritoId mudar

    const handleAdicionarComentario = async () => {
        if (text.trim() === "") return;

        try {
            const novoComentario = await adicionarComentario(favoritoId, text);
            setComentariosList((prevComentarios) => [
                ...prevComentarios,
                novoComentario.data.novoComentario,
            ]);
            setText(""); // Limpa o campo de comentário após adicionar
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
        }
    };

    const handleRemoverComentario = async (comentarioId) => {
        try {
            await removerComentario(favoritoId, comentarioId);
            setComentariosList((prevComentarios) =>
                prevComentarios.filter((c) => c._id !== comentarioId)
            );
        } catch (error) {
            console.error("Erro ao remover comentário:", error);
        }
    };

    return (
        <div className="comentarios">
            <h3>Comentários</h3>
            <ul>
                {comentariosList && comentariosList.length > 0 ? (
                    comentariosList.map((comentario, index) => (
                        <li key={comentario._id || index} style={{ display: "flex" }}>
                            <p>{comentario.text}</p>
                            <button onClick={() => handleRemoverComentario(comentario._id)}>
                                Remover
                            </button>
                        </li>
                    ))
                ) : (
                    <p>Nenhum comentário disponível.</p>
                )}
            </ul>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Adicionar comentário"
            />
            <button onClick={handleAdicionarComentario}>Adicionar</button>
        </div>
    );
};

export default Comentario;
