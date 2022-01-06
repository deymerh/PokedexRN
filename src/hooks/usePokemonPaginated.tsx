import { useEffect, useRef, useState } from 'react';

import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SinglePokemon, Result } from '../interfaces/interfaces.pokemon';

export const usePokemonPaginated = () => {
  const [loading, setLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SinglePokemon[]>([]);

  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  const loadPokemons = async () => {
    const res = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
    nextPageUrl.current = res.data.next;
    mapPokemonList(res.data.results);
  }

  const mapPokemonList = (pokemonList: Result[]) => {
    setLoading(true);

    const newPokemonList: SinglePokemon[] = pokemonList.map(({ name, url }) => {
      const urlPatarts = url.split('/');
      const id = urlPatarts[urlPatarts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      return { id, picture, name };
    });

    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
    setLoading(false);
  }

  useEffect(() => {
    loadPokemons();
  }, []);

  return { simplePokemonList, loadPokemons };
}