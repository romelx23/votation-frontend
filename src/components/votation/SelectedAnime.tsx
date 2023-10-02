import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector, useLocalSotarage } from '../../hooks';
import { useAnime } from '../../hooks/useAnime';
import { useForm } from '../../hooks/useForm';
import { AddForm, Anime, Search } from '../../interfaces';
import { VotationLayout } from '../layouts/VotationLayout';
import { ButtonAnime } from './ButtonAnime';
import { FormConfiguration } from './FormConfiguration';
import { ModalAnime } from './ModalAnime';
import { useUi } from '../../hooks/useUi';
import { ToastVotation } from './ToastVotation';

export const SelectedAnime = () => {
    const { handleStorage } = useLocalSotarage();
    const { anime, loading, getAnime, error } = useAnime();
    const { animeList, configuration: { cantidad }, show } = useAppSelector(state => state.anime);
    const { handleShow } = useUi();
    const { values, handleInputChange: handleChange, reset } = useForm<Search>({
        search: ''
    });

    const [state, setState] = useState(true);
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(values);
        getAnime(values.search);
        reset();
    }

    useEffect(() => {
        handleStorage();
    }, [])

    return (
        <VotationLayout>
            <div className="flex flex-col items-center">
                <h1 className='text-lg font-semibold'>Añade Animes para el Top 👑</h1>
                <div className="flex flex-col w-full items-center max-w-[500px]
                sticky top-[20px] z-10 bg-[#242424]">
                    <div className="w-full flex gap-1">
                        <button
                            onClick={() => setState(true)}
                            className={`py-2 font-semibold flex-grow ${ state ? 'bg-violet-500' : 'bg-gray-500' }`}>
                            Configuración
                            <i className="fas fa-cog"></i>
                        </button>
                        <button
                            onClick={() => setState(false)}
                            className={`py-2 font-semibold flex-grow ${ state ? 'bg-gray-500' : 'bg-violet-500' }`}>
                            Añadir Anime
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <div className="py-2 w-full flex justify-between items-center font-semibold">
                        <p>Escogidos :
                            <span className='rounded-lg bg-blue-600 py-2 px-2'>
                                {animeList.length}/{cantidad}
                            </span>
                        </p>
                        <button
                            onClick={() => handleShow(true)}
                            className='btn gap-2'>
                            <span>
                                Ver Animes
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {state ?
                    <FormConfiguration />
                    :
                    <div>
                        <form
                            autoComplete='off'
                            onSubmit={handleSearch}
                            className="flex w-full items-center max-w-[500px] sticky top-[110px] z-10 bg-[#242424]">
                            <input type="text"
                                autoComplete='off'
                                name='search'
                                value={values.search}
                                onChange={handleChange}
                                placeholder='Buscar Anime' className='w-full py-2 px-3 my-4 shadow-lg focus:shadow-indigo-600 transition-all' />
                            <button className='btn h-10'>
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                        <div className='flex flex-col gap-4'>
                            {loading ? <h1>Loading...</h1> : anime.map((anime) => {
                                return <div key={anime.mal_id}>
                                    <div className='pb-2 flex items-center font-semibold relative max-w-[500px] justify-between'>
                                        <h1 className="w-64 text-ellipsis overflow-hidden">{anime.title}</h1>
                                        <p className='absolute top-0 left-0'>#{anime.mal_id}</p>
                                        <div className='content-image'>
                                            <img src={anime.images.jpg.image_url} alt={anime.title} className="w-40 h-40 object-cover" />
                                        </div>
                                    </div>
                                    <ButtonAnime anime={anime} />
                                </div>
                            })}
                            {
                                anime.length === 0 && <h1>No hay resultados</h1>
                            }
                            {
                                error && <h1>Hubo un error al buscar</h1>
                            }
                        </div>
                    </div>
                }
            </div>
            <div className="h-20"></div>
            {
                <div className={`transition-all ${ show ? 'opacity-100 block' : 'opacity-0 hidden' }`}>
                    <ModalAnime />
                </div>
            }
        </VotationLayout>
    )
}
