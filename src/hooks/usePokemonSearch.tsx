import { useEffect, useState } from 'react';

import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SinglePokemon, Result } from '../interfaces/interfaces.pokemon';

export const usePokemonSearch = () => {
  const [isFeching, setIsFeching] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SinglePokemon[]>([]);

  const loadPokemons = async () => {
    const res = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');
    mapPokemonList(res.data.results);
  }

  const mapPokemonList = (pokemonList: Result[]) => {

    const newPokemonList: SinglePokemon[] = pokemonList.map(({ name, url }) => {
      const urlPatarts = url.split('/');
      const id = urlPatarts[urlPatarts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      return { id, picture, name };
    });

    setSimplePokemonList(newPokemonList);
    setIsFeching(false);
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  return { isFeching, simplePokemonList };
}