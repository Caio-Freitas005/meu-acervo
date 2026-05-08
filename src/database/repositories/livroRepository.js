import { getDB } from "../db";
/*
titulo TEXT,
autor TEXT,
ano_publicacao INTEGER,
uri_capa TEXT,
avaliacao INTEGER CHECK(avaliacao BETWEEN 0 AND 10),
opiniao TEXT,
status TEXT CHECK(status IN ('lido', 'lendo')),
ultima_pagina_lida INTEGER,
favoritado BOOLEAN 
*/

const addLivro = async (titulo, autor, anoPublicacao, uriCapa,
                        avaliacao, opiniao, status, ultimaPaginaLida) => {
    try {   
        const db = await getDB()
        await db.runAsync(
            'INSERT INTO livros (titulo, autor, ano_publicacao, uri_capa, avaliacao, opiniao, status, ultima_pagina_lida) VALUES (?,?,?,?,?,?,?,?)',
            [titulo, autor, anoPublicacao, uriCapa, avaliacao, opiniao, status, ultimaPaginaLida]
        )
        console.log("Inseriu livro com sucesso.")
    } catch (error) {
        console.log("Erro ao inserir livro:", error)
    }
}

const getLivroById = async (id) => {
    try {
        const db = await getDB()
        return await db.getFirstAsync(
            `SELECT * FROM livros WHERE id_livro = ?`,
            [id]
        )
    } catch (error) {
        console.log("Erro ao buscar livro:", error)
    }
}

const getLivros = async () => {
    try {
        const db = await getDB()
        return await db.getAllAsync(
            `SELECT * FROM livros`
        )
    } catch (error) {
        console.log("Erro ao buscar livros:", error)
    }
}

const updateLivro = async (id,titulo, autor, anoPublicacao, uriCapa,
                        avaliacao, opiniao, status, ultimaPaginaLida) => {
    try {
        const db = await getDB()
        await db.runAsync(
            'UPDATE livros SET titulo = ?, autor = ?, ano_publicacao = ?, uri_capa = ?, avaliacao = ?, opiniao = ?, status = ?, ultima_pagina_lida = ? WHERE id_livro = ?',
            [titulo, autor, anoPublicacao, uriCapa, avaliacao, opiniao, status, ultimaPaginaLida, id]
        )
    } catch (error) {
        console.log("Erro ao atualizar livro:", error)
    }
}

const deleteLivro = async (id) => {
    try {
        const db = await getDB()
        return await db.runAsync(
            `DELETE FROM livros WHERE id_livro = ?`,
            [id]
        )
    } catch (error) {
        console.log("Erro ao buscar livro:", error)
    }
}

export {addLivro, getLivroById, getLivros, updateLivro, deleteLivro}