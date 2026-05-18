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
favoritado INTEGER CHECK(favoritado IN (0, 1))
*/

const addLivro = async (
  titulo,
  autor,
  sinopse,
  anoPublicacao,
  uriCapa,
  avaliacao,
  opiniao,
  status,
  ultimaPaginaLida,
  favoritado,
) => {
  try {
    const db = await getDB();
    await db.runAsync(
      "INSERT INTO livros (titulo, autor, sinopse, ano_publicacao, uri_capa, avaliacao, opiniao, status, ultima_pagina_lida, favoritado) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        titulo,
        autor,
        sinopse,
        anoPublicacao,
        uriCapa,
        avaliacao,
        opiniao,
        status,
        ultimaPaginaLida,
        favoritado,
      ],
    );
    console.log("Inseriu livro com sucesso.");
  } catch (error) {
    console.log("Erro ao inserir livro:", error);
  }
};

const getLivroById = async (id) => {
  try {
    const db = await getDB();
    return await db.getFirstAsync(`SELECT * FROM livros WHERE id_livro = ?`, [
      id,
    ]);
  } catch (error) {
    console.log("Erro ao buscar livro:", error);
  }
};

const getLivros = async () => {
  try {
    const db = await getDB();
    return await db.getAllAsync(`SELECT * FROM livros`);
  } catch (error) {
    console.log("Erro ao buscar livros:", error);
  }
};

const getLivrosFavoritados = async () => {
  try {
    const db = await getDB();

    return await db.getAllAsync(`SELECT * FROM livros WHERE favoritado = 1`);
  } catch (error) {
    console.log("Erro ao buscar livros favoritados:", error);
  }
};

const updateLivro = async (
  id,
  titulo,
  autor,
  sinopse,
  anoPublicacao,
  uriCapa,
  avaliacao,
  opiniao,
  status,
  ultimaPaginaLida,
  favoritado,
) => {
  try {
    const db = await getDB();
    await db.runAsync(
      "UPDATE livros SET titulo = ?, autor = ?, sinopse = ?, ano_publicacao = ?, uri_capa = ?, avaliacao = ?, opiniao = ?, status = ?, ultima_pagina_lida = ?, favoritado = ? WHERE id_livro = ?",
      [
        titulo,
        autor,
        sinopse,
        anoPublicacao,
        uriCapa,
        avaliacao,
        opiniao,
        status,
        ultimaPaginaLida,
        favoritado,
        id,
      ],
    );
  } catch (error) {
    console.log("Erro ao atualizar livro:", error);
  }
};

const deleteLivro = async (id) => {
  try {
    const db = await getDB();
    return await db.runAsync(`DELETE FROM livros WHERE id_livro = ?`, [id]);
  } catch (error) {
    console.log("Erro ao buscar livro:", error);
  }
};

const countLivros = async () => {
  try {
    const db = await getDB();
    const resultado = await db.getAllAsync(`SELECT COUNT(*) AS total FROM livros`);
    return resultado[0].total;
  } catch (error) {
    console.log("Erro ao contar livros:", error);
  }
};

const countFavoritos = async () => {
  try {
    const db = await getDB();
    const resultado = await db.getAllAsync(`SELECT COUNT(*) AS total FROM livros WHERE favoritado = 1`);
    return resultado[0].total;
  } catch (error) {
    console.log("Erro ao contar livros:", error);
  }
};


export {
  addLivro,
  getLivroById,
  getLivros,
  getLivrosFavoritados,
  updateLivro,
  deleteLivro,
  countLivros,
  countFavoritos,
};
