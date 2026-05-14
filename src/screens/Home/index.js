import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Acervo 📚</Text>
      <Text style={styles.subtitle}>Bem-vindo à sua coleção de livros!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumo do Acervo</Text>
        <Text style={styles.cardText}>Total de livros: 12</Text>
        <Text style={styles.cardText}>Favoritos: 5</Text>
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
