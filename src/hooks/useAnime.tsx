import { useEffect, useState } from "react"
import { animeApi, pokeApi } from "../api/config"
import { Anime, AnimeResponse, Pokemon, PokemonResponse } from "../interfaces";

export const useAnime = () => {
    const [anime, setAnime] = useState<Anime[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getAnime = async (query: string) => {
        try {
            // const { data } = await animeApi.get<AnimeResponse>(`?q=${query}`)
            const data = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`, {
                method: 'GET',
            })
            const resp: AnimeResponse = await data.json()
            setAnime(resp.data)
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAnime("sword");
    }, [])

    return { anime, loading, error, getAnime }
}