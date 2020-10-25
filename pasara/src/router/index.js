import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  Splash,
  Login,
  Register,
  ListMov,
  SearchMov,
  Profil,
  AboutMe,
  ChatBox
} from '../pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomePage = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ListMov"
        component={ListMov}
        options={{
          tabBarLabel: 'My List Movies',
          tabBarIcon: (color, size) => (
            <Image
              style={{height: 20, width: 20}}
              source={require('../image/list.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchMov"
        component={SearchMov}
        options={{
          tabBarLabel: 'Search Movies',
          tabBarIcon: (color, size) => (
            <Image
              style={{height: 20, width: 20}}
              source={require('../image/loupe.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatBox"
        component={ChatBox}
        options={{
          tabBarLabel: 'ChatBox',
          tabBarIcon: (color, size) => (
            <Image
              style={{height: 22, width: 22}}
              source={require('../image/speech.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={Profil}
        options={{
          tabBarIcon: (color, size) => (
            <Image
              style={{height: 20, width: 20}}
              source={require('../image/user.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen name="AboutMe" component={AboutMe} />
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
