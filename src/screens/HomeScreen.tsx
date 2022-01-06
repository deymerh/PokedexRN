import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from '../globalStyles/styles';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { simplePokemonList, loadPokemons } = usePokemonPaginated();
  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokeBolaRG}
      />
      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={(pokemon) => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (<PokemonCard pokemon={item} />)}
          onEndReached={loadPokemons}
          ListHeaderComponent={(
            <Text style={{
              ...styles.title, top: top + 20,
              marginBottom: top + 20
            }}>Pokedex</Text>
          )}
          onEndReachedThreshold={0.4}
          ListFooterComponent={(
            <ActivityIndicator
              style={{ height: 100 }}
              size={20}
              color='grey'
            />
          )}
        />
      </View>
    </>
  )
}

// <FadeInImage
//   uri={item.picture}
//   style={{
//     height: 100,
//     width: 100
//   }}
// />