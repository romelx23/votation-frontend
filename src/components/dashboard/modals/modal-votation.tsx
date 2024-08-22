import { FC, useEffect, useState } from "react";
import { useAnime, useAppSelector, useVotation } from "../../../hooks";
import { FormConfiguration } from "../../votation/FormConfiguration";
import { AddAnimePage } from "../../votation/AddAnimePage";
import { ConfirmationPage } from "../../votation/ConfirmationPage";

interface ModalVotationProps {
    id: string;
    // votationData: any;
    onClose: () => void;
}

export const ModalVotation: FC<ModalVotationProps> = ({ id, onClose }) => {

    const [state, setState] = useState(1);

    const { getVotation } = useVotation();
    const { anime, loading, getAnime, error } = useAnime();
    const { animeList, configuration, show, errorMessage } = useAppSelector(state => state.anime);

    useEffect(() => {
        setState(1);
        getVotation(id);
    }, [id])
    return (
        <>
            <div className="flex justify-center">
                {
                    loading && <p>Cargando...</p>
                }
            </div>
            <div className="flex flex-col items-center">
                <div className="w-full max-w-[500px] pt-3 flex justify-between text-sm mt-2">
                    <span>Paso 1</span>
                    <span>Paso 2</span>
                    <span>Paso 3</span>
                </div>
                <div className="w-full max-w-[500px] my-2 h-3 border-2 border-white rounded-xl">
                    <div className={`h-full transition-all delay-100 bg-blue-500 rounded-xl ${ state === 1 ? 'w-1/3' : state === 2 ? 'w-2/3' : 'w-full' }`}></div>
                </div>

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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className=""><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className=""><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
                            Agregar Anime
                        </button>
                    }
                    {
                        state === 2 && (animeList.length == configuration.cantidad) &&
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className=""><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                        </button>
                    }

                </div>

                <div className="py-2 px-5 w-full flex justify-between items-center font-semibold">
                    <p>Escogidos :
                        <span className='rounded-lg bg-blue-600 py-2 px-2'>
                            {animeList.length}/{configuration.cantidad}
                        </span>
                    </p>
                </div>

                {
                    // state === 1 &&
                    <div className={`${ state === 1 ? 'flex w-full justify-center' : 'hidden' }`}>
                        <FormConfiguration
                            // state={state}
                            setState={setState}
                            isVisible={true}
                        />
                    </div>
                }
                {
                    // state === 2 &&
                    <>
                        <div className={`${ state === 2 ? 'block' : 'hidden' } w-full px-5 mx-auto`}>
                            <AddAnimePage
                                anime={anime}
                                loading={loading}
                                getAnime={getAnime}
                                error={error}
                                classNameList="h-[40vh]"
                            />
                        </div>
                    </>
                }
                {
                    // state === 3 &&
                    <div className={`${ state === 3 ? 'block' : 'hidden' } w-full px-5 mx-auto`}>
                        <ConfirmationPage
                            id={id}
                            onClose={onClose}
                        />
                    </div>
                }

            </div>
        </>
    )
}
