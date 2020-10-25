/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import Router from './router';
import {store} from './redux';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
