import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParams } from './Navigation';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SearchPokemonScreen } from '../screens/SearchPokemonScreen';

const Stack = createStackNavigator<RootStackParams>();

export const TabSearchNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="Home" component={SearchPokemonScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
}