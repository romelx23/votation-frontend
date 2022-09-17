import { useEffect, useState } from "react"
import { animeApi, pokeApi } from "../api/config"
import { Anime, AnimeResponse, Pokemon, PokemonResponse } from "../interfaces";

export const usePokemon = () => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getPokemon = async () => {
        try {
            const { data } = await pokeApi.get<PokemonResponse>(`?limit=10&offset=0`)
            const pokemon = data.results.map((pokemon, index) => {
                const pokemonId = pokemon.url.split('/')[pokemon.url.split('/').length - 2]
                const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
                return {
                    ...pokemon,
                    id: pokemonId,
                    image: pokemonImage
                }
            })
            setPokemon(pokemon)
            console.log(data)
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        getPokemon();
    }, [])

    return { pokemon, loading, error }
}