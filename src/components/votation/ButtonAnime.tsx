import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Anime, ISelectedAnime } from '../../interfaces';
import { deleteAnime, setAnimeList } from '../../store/slices';
import { toast } from 'sonner';

interface Props {
    anime: Anime;
}

export const ButtonAnime: FC<Props> = ({ anime }) => {
    const { animeList, configuration: { cantidad } } = useAppSelector(state => state.anime);
    const [select, setSelect] = useState(false);
    const dispatch = useAppDispatch();
    const handleAdd = (ani: ISelectedAnime) => {
        if (!(animeList.length < cantidad)) {
            console.log('No puedes añadir mas animes');
            toast.error(`Se ha alcanzado el limite de animes ${ cantidad }`);
            return;
        };
        if (animeList.find(anime => anime.mal_id === ani.mal_id)) {
            console.log('Este anime ya esta en la lista');
            return;
        }
        setSelect(true);
        dispatch(setAnimeList(ani));
    }
    const handleDelete = (ani: Anime) => {
        setSelect(false);
        dispatch(deleteAnime(ani.mal_id));
    }

    return (
        <>
            {
                (animeList.find(ani => ani.mal_id === anime.mal_id)) ?
                    <button
                        onClick={() => handleDelete(anime)}
                        className="btn btn__primary w-full">
                        {/* Añadido */}
                        Quitar de la lista
                    </button>
                    : <button
                        onClick={() => handleAdd({
                            mal_id: anime.mal_id,
                            title: anime.title,
                            image: anime.images.jpg.image_url
                        })}
                        className="btn w-full">
                        Añadir
                    </button>
            }
        </>
    )
}
