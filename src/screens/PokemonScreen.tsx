import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';

import { upperCase } from '../helpers/toUppercase';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };

export const PokemonScreen = ({ route, navigation }: Props) => {
  const { SinglePokemon, color } = route.params;
  const { isLoading, pokemon } = usePokemon(SinglePokemon.id);
  const { top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...styles.headerContainer, backgroundColor: color }}>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{
            ...styles.btnButton,
            top: top + 15
          }}
        >
          <Icon name='arrow-back-outline' color="white" size={30} />
        </TouchableOpacity>
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 50
          }}>
          {upperCase(SinglePokemon.name) + '\n'}#{SinglePokemon.id}
        </Text>
        <Image
          source={require('../assets/pokebolablanca.png')}
          style={{ ...styles.pokeball }}
        />
        <FadeInImage
          uri={SinglePokemon.picture}
          style={{ ...styles.pokemonImage }}
        />
      </View>
      {
        isLoading
          ? (<View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color={color} size={30} />
          </View>)
          : <PokemonDetails pokemon={pokemon} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  btnButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -10
  }
});
