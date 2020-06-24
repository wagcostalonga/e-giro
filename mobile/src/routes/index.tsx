import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import Places from '../pages/Places';
import Detail from '../pages/Detail';

const { Navigator, Screen } = createStackNavigator();

const Routes: React.FC = () => (
  <NavigationContainer>
    <Navigator
      headerMode="none"
      screenOptions={{ cardStyle: { backgroundColor: '#eee' } }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="Places" component={Places} />
      <Screen name="Detail" component={Detail} />
    </Navigator>
  </NavigationContainer>
);

export default Routes;
