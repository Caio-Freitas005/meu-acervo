import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'

import { testeAnotacoes, limparAnotacoes } from '../../testeCrudAnotacoes';
import { testeLivros, limparLivros } from '../../testeCrudLivros';

export default function TesteCrud() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Testa CRUD</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => testeLivros()}>
        <Text style={styles.buttonText}>Testar Livros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => testeAnotacoes()}>
        <Text style={styles.buttonText}>Testar Anotações</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Limpeza de dados (cuidado)</Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => limparLivros()}>
        <Text style={styles.buttonText}>Limpar Livros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => limparAnotacoes()}>
        <Text style={styles.buttonText}>Limpar Anotacoes</Text>
      </TouchableOpacity>
    </View>
  );
}

