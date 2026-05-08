import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TesteCrudLivros from '../TesteCrudLivros';

const Tab = createBottomTabNavigator()

export default function TestesNav() {
  return (
      <Tab.Navigator>
        <Tab.Screen name='Banco' component={TesteCrudLivros} />
      </Tab.Navigator>
  );
}

