import * as SQLite from "expo-sqlite"

let db = null

export const getDB = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync('acervo.db')
        await initSchema(db)
    }
    return db
}

const initSchema = async (db) => {
    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS livros (
            id_livro INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            autor TEXT,
            ano_publicacao INTEGER CHECK(ano_publicacao < 10000 AND ano_publicacao > 999),
            uri_capa TEXT,
            avaliacao INTEGER CHECK(avaliacao BETWEEN 0 AND 5),
            opiniao TEXT,
            status TEXT CHECK(status IN ('lido', 'lendo')),
            ultima_pagina_lida INTEGER,
            favoritado BOOLEAN
        )`
    )

    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS anotacoes (
            id_anotacao INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo_anotacao TEXT,
            texto_anotacao TEXT,
            id_livro INTEGER,
            FOREIGN KEY (id_livro) REFERENCES livros(id_livro)
        )`
    )
}