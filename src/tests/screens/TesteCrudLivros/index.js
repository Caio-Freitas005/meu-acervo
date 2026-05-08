import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'

import { testeLivros, limparLivros } from '../../testeCrudLivros';

export default function TesteCrudLivros() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Testa Crud</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => testeLivros()}>
        <Text style={styles.buttonText}>Testar Livros</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Limpeza de dados (cuidado)</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => limparLivros()}>
        <Text style={styles.buttonText}>Limpar Banco</Text>
      </TouchableOpacity>
    </View>
  );
}

