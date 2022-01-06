import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PokemonFull } from '../interfaces/interfaces.pokemon';
import { FadeInImage } from './FadeInImage';
import { upperCase } from '../helpers/toUppercase';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props) => {
  return (
    <ScrollView
      style={{ ...StyleSheet.absoluteFillObject, paddingBottom: 50 }}
    >
      <View style={{ ...styles.container, marginTop: 350 }}>
        <Text style={styles.title}>Types</Text>
        <View style={{ flexDirection: 'row' }}>
          {
            pokemon.types.map(({ type }) => (
              <Text key={type.name} style={{ ...styles.types, marginRight: 10 }}>{type.name}</Text>
            ))
          }
        </View>
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.types}>{pokemon.weight}kg</Text>
      </View>
      <View style={{ ...styles.container, }}>
        <Text style={styles.title}>Sprites</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FadeInImage style={styles.basicSprite} uri={pokemon.sprites.front_default} />
        <FadeInImage style={styles.basicSprite} uri={pokemon.sprites.back_default} />
        <FadeInImage style={styles.basicSprite} uri={pokemon.sprites.front_shiny} />
        <FadeInImage style={styles.basicSprite} uri={pokemon.sprites.back_shiny} />
      </ScrollView>
      <View style={{ ...styles.container, }}>
        <Text style={styles.title}>Habilidades base</Text>
        <View style={{ flexDirection: 'row' }}>
          {
            pokemon.abilities.map(({ ability }) => (
              <Text key={ability.name} style={{ ...styles.types, marginRight: 10 }}>{ability.name}</Text>
            ))
          }
        </View>
      </View>
      <View style={{ ...styles.container, }}>
        <Text style={styles.title}>Movimientos</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            pokemon.moves.map(({ move }) => (
              <Text key={move.name} style={{ ...styles.types, marginRight: 10 }}>{move.name}</Text>
            ))
          }
        </View>
      </View>
      <View style={{ ...styles.container, }}>
        <Text style={styles.title}>Stats</Text>
        {
          pokemon.stats.map((stat, i) => (
            <View key={stat.stat.name + i} style={{ flexDirection: 'row' }}>
              <Text style={{ ...styles.types, width: 150 }}>{upperCase(stat.stat.name)}</Text>
              <Text style={{ ...styles.types, fontWeight: 'bold' }}>{stat.base_stat}</Text>
            </View>
          ))
        }
      </View>
      <View style={{ alignItems: 'center' }}>
        <FadeInImage style={styles.basicSprite} uri={pokemon.sprites.front_default} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 20
  },
  types: {
    color: 'black',
    fontSize: 17
  },
  regulartext: {
    color: 'black',
    fontSize: 19
  },
  basicSprite: {
    width: 100,
    height: 100
  }
});