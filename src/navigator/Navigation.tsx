import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';

import { SinglePokemon } from '../interfaces/interfaces.pokemon';

export type RootStackParams = {
  Home: undefined;
  PokemonScreen: { SinglePokemon: SinglePokemon, color: string }
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white'
          }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}