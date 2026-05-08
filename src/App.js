import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { testeLivros } from './tests/testeCrudLivros';
import { getDB } from './backend/db';
import Home from './screens/Home/index'
import Acervo from './screens/Acervo/index'
import TestesNav from './tests/screens/TestesNav/index'

const Tab = createBottomTabNavigator();

export default function App() {
  const [bancoPronto, setBancoPronto] = useState(false);

  useEffect(() => {
    async function prepararBanco() {
      try {
        await getDB(); 
        await testeLivros(); 
        
        setBancoPronto(true);
      } catch (error) {
        console.error("Erro fatal ao iniciar:", error);
      }
    }

    prepararBanco();
  }, []);

  if (!bancoPronto) {
    return (
      <View style={styles.container}>
        <Text>Preparando seu acervo...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Acervo" component={Acervo} />
        <Tab.Screen name="Testes" component={TestesNav} />
      </Tab.Navigator>      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
