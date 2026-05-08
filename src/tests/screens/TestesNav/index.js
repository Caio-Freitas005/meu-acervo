import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { styles } from './styles'
import TestesDeBancoScreen from '../TestesDeBanco';

const Tab = createBottomTabNavigator()

export default function TestesNav() {
  return (
      <Tab.Navigator>
        <Tab.Screen name='Banco' component={TestesDeBancoScreen} />
      </Tab.Navigator>
  );
}

