import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { styles } from "./styles";
import { getLivrosFavoritados } from "../../database/repositories/livroRepository";

export default function Favoritos({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    setLoading(true);

    try {
      const data = await getLivrosFavoritados();
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
        <ActivityIndicator
          size="large"
          color="#4F46E5"
          style={styles.loader}
        />
      ) : livros.length === 0 ? (
        <Text style={styles.emptyText}>
          Nenhum livro favoritado.
        </Text>
      ) : (
        <View>
          <Text style={styles.title}>Livros Favoritos ⭐</Text>

          <Text style={styles.subtitle}>
            Seus livros marcados como favoritos
          </Text>

          <FlatList
            data={livros}
            keyExtractor={(item) =>
              String(item.id_livro || Math.random())
            }
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View>
                  <Text>{item.titulo}</Text>

                  <Text>{item.autor}</Text>

                  <Text>{item.ano_publicacao}</Text>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}