import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { countFavoritos, countLivros } from "../../database/repositories/livroRepository";

export default function Home({ navigation }) {
  const [numeroLivros, setNumeroLivros] = useState(0);
  const [numeroFavoritos, setNumeroFavoritos] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchCount = async () => {
        const totalLivros = await countLivros();
        setNumeroLivros(totalLivros);

        const totalFavoritos = await countFavoritos();
        setNumeroFavoritos(totalFavoritos)
      };

      fetchCount();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Acervo 📚</Text>
      <Text style={styles.subtitle}>Bem-vindo à sua coleção de livros!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumo do Acervo</Text>
        <Text style={styles.cardText}>Total de livros: {numeroLivros}</Text>
        <Text style={styles.cardText}>Favoritos: {numeroFavoritos}</Text>
      </View>

      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Acessar Meu Acervo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("GerenciarLivro")}
      >
        <Text style={styles.buttonText}>Adicionar novo livro</Text>
      </TouchableOpacity>
    </View>
  );
}
