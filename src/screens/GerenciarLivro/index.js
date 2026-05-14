import { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import {
  addLivro,
  updateLivro,
} from "../../database/repositories/livroRepository";

export default function GerenciarLivro({ navigation, route }) {
  const livroParaEditar = route.params?.livro;

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [status, setStatus] = useState("lendo");
  const [favoritado, setFavoritado] = useState(0);

  useEffect(() => {
    if (livroParaEditar) {
      setTitulo(livroParaEditar.titulo);
      setAutor(livroParaEditar.autor);
      setAno(String(livroParaEditar.ano_publicacao));
      setStatus(livroParaEditar.status);
      setFavoritado(livroParaEditar.favoritado);
    }
  }, [livroParaEditar]);

  async function salvar() {
    if (!titulo || !autor || !ano) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    try {
      if (livroParaEditar) {
        await updateLivro(
          livroParaEditar.id_livro,
          titulo,
          autor,
          parseInt(ano),
          livroParaEditar.uri_capa,
          livroParaEditar.avaliacao,
          livroParaEditar.opiniao,
          status,
          livroParaEditar.ultima_pagina_lida,
          favoritado,
        );
      } else {
        await addLivro(
          titulo,
          autor,
          parseInt(ano),
          "",
          0,
          "",
          status,
          0,
          favoritado,
        );
      }
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {livroParaEditar ? "Editar Livro" : "Novo Livro"}
      </Text>

      <TextInput
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />
      <TextInput
        placeholder="Autor"
        value={autor}
        onChangeText={setAutor}
        style={styles.input}
      />
      <TextInput
        placeholder="Ano"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity
        onPress={() => setStatus(status === "lido" ? "lendo" : "lido")}
        style={styles.buttonSecondary}
      >
        <Text>Status: {status === "lido" ? "Lido ✅" : "Lendo 📖"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setFavoritado(favoritado === 1 ? 0 : 1)}
        style={styles.buttonSecondary}
      >
        <Text>Favorito: {favoritado === 1 ? "Sim ⭐" : "Não ☆"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={salvar} style={styles.button}>
        <Text style={styles.buttonText}>Salvar Livro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
