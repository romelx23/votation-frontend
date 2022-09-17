import React, { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Anime } from '../../interfaces';
import { deleteAnime, setAnimeList } from '../../store/slices';

interface Props {
    anime: Anime;
}

export const ButtonAnime: FC<Props> = ({ anime }) => {
    const { animeList, configuration: { cantidad } } = useAppSelector(state => state.anime);
    const [select, setSelect] = useState(false);
    const dispatch = useAppDispatch();
    const handleAdd = (ani: Anime) => {
        if (!(animeList.length < cantidad)) {
            console.log('No puedes añadir mas animes');
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
                        Añadido
                    </button>
                    : <button
                        onClick={() => handleAdd(anime)}
                        className="btn w-full">
                        Añadir
                    </button>
            }
        </>
    )
}
