import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'

import { testeLivros, limparLivros } from '../../TestesDeBanco';

export default function TestesDeBancoScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => testeLivros()}>
        <Text style={styles.buttonText}>Testar Livros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => limparLivros()}>
        <Text style={styles.buttonText}>Limpar Livros</Text>
      </TouchableOpacity>
    </View>
  );
}

