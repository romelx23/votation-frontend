import { useEffect, useState } from 'react'
import { useAppSelector, useLocalSotarage } from '../../hooks';
import { useAnime } from '../../hooks/useAnime';
// import { useForm } from '../../hooks/useForm';
// import { AddForm, Anime, Search } from '../../interfaces';
import { VotationLayout } from '../layouts/VotationLayout';
// import { ButtonAnime } from './ButtonAnime';
import { FormConfiguration } from './FormConfiguration';
import { ModalAnime } from './ModalAnime';
import { useUi } from '../../hooks/useUi';
import { AddAnimePage } from './AddAnimePage';
import { ConfirmationPage } from './ConfirmationPage';
// import { ToastVotation } from './ToastVotation';

export const SelectedAnime = () => {
    const { handleStorage } = useLocalSotarage();

    const { animeList, configuration: { cantidad }, show, errorMessage } = useAppSelector(state => state.anime);

    const { anime, loading, getAnime, error } = useAnime();

    const { handleShow } = useUi();
    // const { values, handleInputChange: handleChange, reset } = useForm<Search>({
    //     search: ''
    // });

    // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(values);
    //     getAnime(values.search);
    //     reset();
    // }

    // console.log(errorMessage);

    const [state, setState] = useState(1);

    const widthProgress = state === 1 ? 'w-1/3'
        : state === 2 ? 'w-2/3'
            : 'w-full';

    useEffect(() => {
        handleStorage();
    }, [])

    console.log(errorMessage);
    console.log(animeList.length);
    console.log(cantidad);

    return (
        <VotationLayout>
            <div className="flex flex-col items-center pt-4">
                <h1 className='text-lg font-semibold'>Añade Animes para el Top 👑</h1>


                <div className="w-full max-w-[500px] flex justify-between text-sm mt-2">
                    <span>Paso 1</span>
                    <span>Paso 2</span>
                    <span>Paso 3</span>
                </div>
                <div className="w-full max-w-[500px] my-2 h-3 border-2 border-white rounded-xl">
                    <div className={`h-full transition-all delay-100 bg-blue-500 rounded-xl ${ widthProgress }`}></div>
                </div>


                <div className="flex flex-col w-full items-center max-w-xl
                sticky top-[20px] z-10 bg-[#242424]">

                    {/* <div className="w-full flex gap-1">
                        <button
                            title='Configuración'
                            onClick={() => setState(true)}
                            className={`py-2 font-semibold flex-grow ${ state ? 'bg-violet-500' : 'bg-gray-500' }`}>
                            Configuración
                            <i className="fas fa-cog"></i>
                        </button>
                        <button
                            title='Añadir Anime'
                            onClick={() => setState(false)}
                            className={`py-2 font-semibold flex-grow ${ state ? 'bg-gray-500' : 'bg-violet-500' }`}>
                            Añadir Anime
                            <i className="fas fa-plus"></i>
                        </button>
                    </div> */}

                    <div className="w-full flex justify-between gap-1 max-w-xl my-2">
                        {
                            state === 2 &&
                            <button
                                title='Configuración'
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                    setState(1);
                                }}
                                type='button'
                                className={`py-1 text-sm font-semibold flex-grow w-10 flex justify-center ${ state ? 'bg-violet-500' : 'bg-gray-500' }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className=""><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
                                Volver a Configuración
                            </button>
                        }
                        {
                            (state === 3) &&
                            <button
                                title='Añadir Anime'
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                    setState(2)
                                }}
                                type='button'
                                className={`py-1 text-sm font-semibold flex-grow w-10 flex justify-center ${ state ? 'bg-gray-500' : 'bg-violet-500' }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className=""><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
                                Agregar Anime
                            </button>
                        }
                        {
                            state === 2 && (animeList.length == cantidad) &&
                            <button
                                title='Siguiente Paso'
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth'
                                    });
                                    setState(3)
                                }}
                                type='button'
                                className={`py-1 text-sm font-semibold flex-grow w-10 flex justify-center ${ state ? 'bg-gray-500' : 'bg-violet-500' }`}>
                                Siguiente Paso
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className=""><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                            </button>
                        }

                    </div>

                    <div className="py-2 w-full flex justify-between items-center font-semibold">
                        <p>Escogidos :
                            <span className='rounded-lg bg-blue-600 py-2 px-2'>
                                {animeList.length}/{cantidad}
                            </span>
                        </p>
                        <button
                            onClick={() => handleShow(true)}
                            className='btn gap-2'
                            title='Ver Animes'
                        >
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

                {state === 1 ?
                    <FormConfiguration
                        // state={state}
                        setState={setState}
                    />
                    :
                    state === 2 ?
                        <AddAnimePage
                            anime={anime}
                            loading={loading}
                            getAnime={getAnime}
                            error={error}
                        />
                        :
                        <ConfirmationPage />
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
