import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, Platform } from 'react-native';

import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';

import { SinglePokemon } from '../interfaces/interfaces.pokemon';

import { styles } from '../globalStyles/styles';

const widthScreen = Dimensions.get('window').width;

export const SearchPokemonScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFeching, simplePokemonList } = usePokemonSearch();
  const [pokemonFiltered, setPokemonFiltered] = useState<SinglePokemon[]>([]);
  const [term, setTerm] = useState('');

  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(
          (poke) => poke.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        )
      )
    } else {
      const pokemonById = simplePokemonList.find(poke => poke.id === term);
      setPokemonFiltered((pokemonById) ? [pokemonById] : [])
    }
  }, [term]);

  if (isFeching) return (<Loading />)

  return (
    <View style={{
      flex: 1,
      marginHorizontal: 20,
    }}>
      <SearchInput
        onDebounce={(value) => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: widthScreen - 40,
          top: Platform.OS === 'ios' ? top : top + 20
        }}
      />
      <FlatList
        data={pokemonFiltered}
        keyExtractor={(pokemon) => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => (<PokemonCard pokemon={item} />)}
        ListHeaderComponent={(
          <Text style={{
            ...styles.title, top: top + 60,
            marginBottom: top + 65
          }}>{term}</Text>
        )}
        onEndReachedThreshold={0.4}
      />
    </View>
  )
}
