import { useEffect, useState } from "react"
import { animeApi } from "../api/config"
import { Anime, AnimeResponse } from "../interfaces"

export const useAnime = () => {
    const [anime, setAnime] = useState<Anime[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getAnime = async (query: string) => {
        try {
            const { data } = await animeApi.get<AnimeResponse>(`?q=${query}`)
            setAnime(data.data)
            setLoading(false)
        } catch (error) {
            setError(true)
            setLoading(false)
        }
    }
    useEffect(() => {
        getAnime("")
    }, [])

    return { anime, loading, error }
}