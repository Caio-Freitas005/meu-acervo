import { getDB } from "../db";
/*
id_anotacao INTEGER PRIMARY KEY AUTOINCREMENT,
titulo_anotacao TEXT,
texto_anotacao TEXT,
id_livro INTEGER
*/

const addAnotacao = async (titulo, texto, livro) => {
  try {
    const db = await getDB();
    await db.runAsync(
      "INSERT INTO anotacoes (titulo_anotacao, texto_anotacao, id_livro) VALUES (?,?,?)",
      [titulo, texto, livro],
    );
    console.log("Inseriu anotação com sucesso.");
  } catch (error) {
    console.log("Erro ao inserir anotação:", error);
  }
};

const getAnotacaoById = async (id) => {
  try {
    const db = await getDB();
    return await db.getFirstAsync(
      `SELECT * FROM anotacoes WHERE id_anotacao = ?`,
      [id],
    );
  } catch (error) {
    console.log("Erro ao buscar anotação:", error);
  }
};

const getAnotacoes = async () => {
  try {
    const db = await getDB();
    return await db.getAllAsync(`SELECT * FROM anotacoes`);
  } catch (error) {
    console.log("Erro ao buscar anotações:", error);
  }
};

const updateAnotacao = async (id, titulo, texto, livro) => {
  try {
    const db = await getDB();
    await db.runAsync(
      "UPDATE anotacoes SET titulo_anotacao = ?, texto_anotacao = ?, id_livro = ?",
      [titulo, texto, livro, id],
    );
  } catch (error) {
    console.log("Erro ao atualizar anotação:", error);
  }
};

const deleteAnotacao = async (id) => {
  try {
    const db = await getDB();
    return await db.runAsync(`DELETE FROM anotacoes WHERE id_anotacao = ?`, [
      id,
    ]);
  } catch (error) {
    console.log("Erro ao excluir anotação:", error);
  }
};

export {
  addAnotacao,
  getAnotacaoById,
  getAnotacoes,
  updateAnotacao,
  deleteAnotacao,
};
