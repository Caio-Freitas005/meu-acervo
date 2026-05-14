import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { testeLivros } from "./tests/testeCrudLivros";
import { testeAnotacoes } from "./tests/testeCrudAnotacoes";
import { getDB } from "./database/db";
import Home from "./screens/Home/index";
import Acervo from "./screens/Acervo/index";
import Favoritos from "./screens/Favoritos/index";
import GerenciarLivro from "./screens/GerenciarLivro";
import TestesNav from "./tests/screens/TestesNav/index";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Acervo" component={Acervo} />
      <Tab.Screen name="Favoritos" component={Favoritos} />
      <Tab.Screen name="Testes" component={TestesNav} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [bancoPronto, setBancoPronto] = useState(false);

  useEffect(() => {
    async function prepararBanco() {
      try {
        await getDB();
        await testeLivros();
        await testeAnotacoes();

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
      <Stack.Navigator>
        <Stack.Screen
          name="Principal"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GerenciarLivro"
          component={GerenciarLivro}
          options={{ title: "Gerenciar" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
