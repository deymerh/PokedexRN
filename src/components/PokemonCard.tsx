import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ImageColors from 'react-native-image-colors'

import { SinglePokemon } from '../interfaces/interfaces.pokemon';
import { FadeInImage } from './FadeInImage';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SinglePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
  const navigation = useNavigation();
  const isMounted = useRef(true);
  const [bgColor, setBgColor] = useState('grey');
  useEffect(() => {
    ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
      .then(colors => {
        if (!isMounted.current) return;
        (colors.platform === 'ios')
          ? setBgColor(colors.background || 'grey')
          : setBgColor(colors.dominant || 'grey')
      });
    return () => {
      isMounted.current = false;
    }
  }, [])
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(
          'PokemonScreen' as never,
          { SinglePokemon: pokemon, color: bgColor } as never)}
      activeOpacity={0.8}
    >
      <View style={{ ...styles.card, width: windowWidth * 0.4, backgroundColor: bgColor }}>
        <Text style={styles.name}>{pokemon.name}{'\n#' + pokemon.id}</Text>
      </View>
      <Image
        source={require('../assets/pokebolablanca.png')}
        style={styles.pokebolaBlanca}
      />
      <FadeInImage
        uri={pokemon.picture}
        style={styles.pokeImage}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10
  },
  name: {
    fontSize: 20,
    color: 'white',
    left: 10,
    top: 20,
    fontWeight: 'bold'
  },
  pokebolaBlanca: {
    height: 100,
    width: 100,
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.4
  },
  pokeImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: 0,
    bottom: 10
  }
});