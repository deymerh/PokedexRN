import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import { Navigation } from './Navigation';
import { TabSearchNavigation } from './TabSearchNavigation';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{
          backgroundColor: 'white'
        }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#5856D5',
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.92)',
            paddingBottom: 10, //( Platform.OS === 'ios') ? 0 : 10, 
            borderWidth: 0,
            elevation: 0,
            height: 65,//( Platform.OS === 'ios') ? 70 : 80,
          }
        }}
      >
        <Tab.Screen
          name="ScreenMain"
          component={Navigation}
          options={{
            tabBarLabel: 'Listado',
            tabBarIcon: (({ color }) => (
              <Icon color={color} size={25} name='list-outline' />
            ))
          }}
        />
        <Tab.Screen
          name="SearchPokemon"
          component={TabSearchNavigation}
          options={{
            tabBarLabel: 'Buscar',
            tabBarIcon: (({ color }) => (
              <Icon color={color} size={25} name='search-outline' />
            ))
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}