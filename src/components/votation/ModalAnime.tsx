import React from 'react'
import { useAppSelector } from '../../hooks/redux/useAppSelector';
import { useAppDispatch } from '../../hooks/redux/useAppDispatch';
import { deleteAnime, setShow } from '../../store/slices';
import { useUi, useVotation } from '../../hooks';
import { Anime } from '../../interfaces';

export const ModalAnime = () => {
    const { animeList, show, configuration: { cantidad } } = useAppSelector(state => state.anime);
    const dispatch = useAppDispatch();
    const { handleShow } = useUi();
    const { handleSubmmit } = useVotation();
    const handleDelete = (ani: Anime) => {
        dispatch(deleteAnime(ani.mal_id));
    }
    return (
        <div className="modal__anime" >
            <div className="modal__anime__content relative">
                <h1 className='text-center font-semibold text-lg'>Animes Añadidos</h1>
                <button
                    title='Cerrar'
                    className='btn absolute top-2 right-2'
                    onClick={() => handleShow(false)}
                >
                    <i className="fas fa-times"></i>
                </button>
                <div className="modal__anime__content__animes">
                    {
                        animeList.length > 0 ?
                            animeList.map((anime, index) => (
                                <div key={index} className="modal__anime__content__animes__item">
                                    <img src={anime.images.jpg.image_url} alt={anime.title}
                                        className="w-40 h-40 object-cover"
                                    />
                                    <h1
                                        className='text-center font-semibold text-lg'
                                    >{anime.title}</h1>
                                    <button
                                        className='btn'
                                        onClick={() => handleDelete(anime)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            ))
                            :
                            <div className="flex w-full h-full justify-center items-center">
                                <h1 className=''>No hay animes añadidos</h1>
                            </div>
                    }
                </div>
                {
                    animeList.length === cantidad * 1 ?
                        <p>
                            Lista completa
                        </p>
                        :
                        <p>Escogidos: {animeList.length}/{cantidad}</p>
                }
                <button
                    onClick={handleSubmmit}
                    disabled={animeList.length < cantidad * 1 || animeList.length === 0}
                    className='btn'
                >
                    Publicar Encuesta
                </button>
            </div>
        </div>
    )
}
