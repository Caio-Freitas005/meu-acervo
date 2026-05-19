import { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";
import {
    addAnotacao,
    updateAnotacao,
} from "../../database/repositories/anotacaoRepository";

export default function GerenciarAnotacao({ navigation, route }) {
    const anotacaoParaEditar = route.params?.anotacao;

    const [titulo_anotacao, setTitulo] = useState("");
    const [texto_anotacao, setTexto] = useState("");

    useEffect(() => {
        if (anotacaoParaEditar) {
            setTitulo(anotacaoParaEditar.titulo_anotacao);
            setTexto(anotacaoParaEditar.texto_anotacao);
        }
    }, [anotacaoParaEditar]);

    async function salvar() {
        if (!titulo_anotacao || !texto_anotacao) {
            alert("Por favor, preencha os campos obrigatórios.");
            return;
        }

        try {
            if (anotacaoParaEditar) {
                await updateAnotacao(
                    anotacaoParaEditar.id_anotacao,
                    titulo_anotacao,
                    texto_anotacao,
                );

            } else {
                await addAnotacao(
                    titulo_anotacao,
                    texto_anotacao

                );
            }
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar a Anotação:", error);
        }
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                {anotacaoParaEditar ? "Editar Anotação" : "Nova Anotação"}
            </Text>

            <TextInput
                placeholder="Título"
                value={titulo_anotacao}
                onChangeText={setTitulo}
                style={styles.input}
            />
            <TextInput
                placeholder="Texto"
                value={texto_anotacao}
                onChangeText={setTexto}
                style={styles.input}
            />


            <TouchableOpacity onPress={salvar} style={styles.button}>
                <Text style={styles.buttonText}>Salvar Anotação</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
