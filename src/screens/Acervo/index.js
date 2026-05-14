import { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { getLivros } from "../../database/repositories/livroRepository";

export default function Acervo({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    setLoading(true);
    try {
      const data = await getLivros();
      setLivros(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", carregar);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4F46E5" style={styles.loader} />
      ) : livros.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum livro cadastrado.</Text>
      ) : (
        <View>
          <Text style={styles.title}>Meu Acervo 📚</Text>
          <Text style={styles.subtitle}>
            Bem-vindo à sua coleção de livros!
          </Text>

          <FlatList
            data={livros}
            keyExtractor={(item) => String(item.id_livro || Math.random())}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("GerenciarLivro", { livro: item })
                }
              >
                <View style={styles.card}>
                  <View>
                    <Text>{item.titulo}</Text>
                    <Text>{item.autor}</Text>
                    <Text>{item.ano_publicacao}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
