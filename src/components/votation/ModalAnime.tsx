import React from 'react'
import { useAppSelector } from '../../hooks/redux/useAppSelector';
import { useAppDispatch } from '../../hooks/redux/useAppDispatch';
import { deleteAnime, setShow } from '../../store/slices';
import { useUi, useVotation } from '../../hooks';
import { Anime, ISelectedAnime } from '../../interfaces';

export const ModalAnime = () => {
    const { animeList, show, configuration: { cantidad } } = useAppSelector(state => state.anime);
    const dispatch = useAppDispatch();
    const { handleShow } = useUi();

    const handleDelete = (ani: ISelectedAnime) => {
        dispatch(deleteAnime(ani.mal_id));
    }
    return (
        <>
            <div className="modal__anime"
                onClick={() => handleShow(false)}
            >
            </div>
            <div className="modal__anime__content relative">
                <div className="flex absolute top-4 left-3">
                    {
                        animeList.length === cantidad * 1 ?
                            <p>
                                Lista completa
                            </p>
                            :
                            <p>Escogidos: {animeList.length}/{cantidad}</p>
                    }
                </div>
                <h1 className='text-center font-semibold text-lg'>Animes Añadidos</h1>
                <button
                    title='Cerrar'
                    className='btn absolute top-2 right-2'
                    onClick={() => handleShow(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
                <div className="modal__anime__content__animes">
                    {
                        animeList.length > 0 ?
                            animeList.map((anime, index) => (
                                <div key={index} className="modal__anime__content__animes__item">
                                    <img src={anime.image} alt={anime.title}
                                        className="w-40 h-40 object-cover"
                                    />
                                    <h1
                                        className='text-center font-semibold text-lg'
                                    >{anime.title}</h1>
                                    <button
                                        className='btn'
                                        onClick={() => handleDelete(anime)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>
                                    </button>
                                </div>
                            ))
                            :
                            <div className="flex w-full h-full justify-center items-center">
                                <h1 className=''>No hay animes añadidos</h1>
                            </div>
                    }
                </div>

                {/* <button
                    onClick={handleSubmmit}
                    disabled={animeList.length < cantidad * 1 || animeList.length === 0}
                    className='btn'
                >
                    Publicar Encuesta
                </button> */}
            </div>
        </>
    )
}
