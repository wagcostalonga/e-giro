import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View } from 'react-native';

import Routes from './routes';

const App: React.FC = () => (
  <>
    <StatusBar
      barStyle="dark-content"
      backgroundColor="transparent"
      translucent
    />
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  </>
);

export default App;
