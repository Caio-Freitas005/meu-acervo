import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TesteCrud from '../TesteCrud';

const Tab = createBottomTabNavigator()

export default function TestesNav() {
  return (
      <Tab.Navigator>
        <Tab.Screen name='Banco' component={TesteCrud} />
      </Tab.Navigator>
  );
}

