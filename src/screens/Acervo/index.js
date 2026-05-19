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
import { getAnotacoes } from "../../database/repositories/anotacaoRepository";

export default function Acervo({ navigation }) {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    setLoading(true);
    try {
      const dataLivros = await getLivros();
      const dataAnotacoes = await getAnotacoes();

      // Mapeia os livros e anexa as anotações correspondentes a cada um
      const livrosComAnotacoes = (dataLivros || []).map((livro) => {
        return {
          ...livro,
          anotacoes: (dataAnotacoes || []).filter(
            (anotacao) => anotacao.id_livro === livro.id_livro
          ),
        };
      });

      setLivros(livrosComAnotacoes);
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
              <View style={styles.card}>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("GerenciarLivro", { livro: item })
                    }
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.titulo}</Text>
                    <Text>{item.autor}</Text>
                    <Text>{item.sinopse}</Text>
                    <Text>Ano: {item.ano_publicacao}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 12 }}>

                  {/* Cabeçalho com botão de adicionar */}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ fontWeight: 'bold' }}>Anotações:</Text>
                    <TouchableOpacity
                      onPress={() =>
                        // Passa o id_livro indicando que é uma criação
                        navigation.navigate("GerenciarAnotacao", { id_livro: item.id_livro })
                      }
                    >
                      <Text style={{ color: '#4F46E5', fontWeight: 'bold' }}>+ Nova</Text>
                    </TouchableOpacity>
                  </View>

                  {item.anotacoes && item.anotacoes.length > 0 ? (
                    item.anotacoes.map((anotacao) => (
                      <TouchableOpacity
                        key={String(anotacao.id_anotacao)}
                        style={{
                          backgroundColor: '#f3f4f6',
                          padding: 8,
                          borderRadius: 6,
                          marginBottom: 6
                        }}
                        onPress={() =>
                          // Passa o objeto completo indicando que é uma edição
                          navigation.navigate("GerenciarAnotacao", { anotacao })
                        }
                      >
                        <Text style={{ fontWeight: 'bold', color: '#4F46E5' }}>
                          {anotacao.titulo_anotacao}
                        </Text>
                        <Text>{anotacao.texto_anotacao}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={{ color: '#9CA3AF', fontStyle: 'italic', fontSize: 13 }}>
                      Nenhuma anotação para este livro.
                    </Text>
                  )}
                </View>
              </View>
            )}
          />

        </View>
      )}
    </View>
  );
}
