/*
* Testa o crud do banco
! Arquivo temporário, remover quando confirmar funcionalidade de banco
*/

import { getDB } from "../backend/db";
import { addLivro, deleteLivro, getLivroById, getLivros, updateLivro } from "../backend/repositories/livroRepository.js";

export const testeLivros = async () => {
    console.log("\nAdicionando livro 1")
    await addLivro("Teste", "Teste", 1000, "Teste", 0, "BOSTA", "lido", 0, 0)

    console.log("\nAdicionando livro 2")
    await addLivro("Teste 2", "Teste 2", 2000, "Teste", 0, "BOSTA", "lido", 0, 1)

    console.log("\nPegando livro 1")
    const livro = await getLivroById(1)
    console.log(livro)

    console.log("\nPegando livros")
    let livros = await getLivros()
    for (const l of livros) {
        console.log(l)
    }

    console.log("\nAtualizando livro 1")
    await updateLivro(1, "Teste", "Teste Atualizado", 1000, "Teste", 0, "BOSTA", "lido", 0, 1)

    console.log("\nPegando livros")
    livros = await getLivros()
    for (const l of livros) {
        console.log(l)
    }

    console.log("\Excluindo livro 1")
    await deleteLivro(1)

    console.log("\nPegando livros")
    livros = await getLivros()
    for (const l of livros) {
        console.log(l)
    }
}

export const limparLivros = async () => {
    try {
        const db = await getDB()
        await db.runAsync(`DELETE FROM livros`)
        await db.runAsync(`DELETE FROM sqlite_sequence WHERE name='livros'`)
        console.log("Livros limpados")

        if (confirm("Executar drop em tabelas?")) {
            await db.runAsync(`DROP TABLE livros`)
        }
    } catch (error) {
        console.log(error)
    }
    
}