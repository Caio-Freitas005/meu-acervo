/*
* Testa o crud do banco
! Arquivo temporário, remover quando confirmar funcionalidade de banco
*/

import { getDB } from "../database/db";
import * as anotacaoRepository from "../database/repositories/anotacaoRepository";

export const testeAnotacoes = async () => {    
    console.log("Adicionando anotação 1")
    await anotacaoRepository.addAnotacao("teste", "teste", 2)

    console.log("Adicionando anotação 2")
    await anotacaoRepository.addAnotacao("teste 2", "teste 2", 2)

    console.log("Obtendo anotação 1")
    let anotacao = await anotacaoRepository.getAnotacaoById(1)
    console.log(anotacao)

    console.log("Obtendo anotações")
    let anotacoes = await anotacaoRepository.getAnotacoes()
    for (const a of anotacoes) {
        console.log(a)
    }

    console.log("Adicionando anotação 1")
    await anotacaoRepository.updateAnotacao("teste atualizado", "teste", 2)

    console.log("Obtendo anotação 1")
    anotacao = await anotacaoRepository.getAnotacaoById(1)
    console.log(anotacao)

    console.log("Adicionando anotação 1")
    await anotacaoRepository.deleteAnotacao(1)

    console.log("Obtendo anotações")
    anotacoes = await anotacaoRepository.getAnotacoes()
    for (const a of anotacoes) {
        console.log(a)
    }
}

export const limparAnotacoes = async () => {
    try {
        const db = await getDB()
        await db.runAsync(`DELETE FROM anotacoes`)
        await db.runAsync(`DELETE FROM sqlite_sequence WHERE name='anotacoes'`)
        console.log("Anotações limpadas")
    } catch (error) {
        console.log(error)
    }
    
}