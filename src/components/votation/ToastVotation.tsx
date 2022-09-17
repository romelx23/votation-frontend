import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux/useAppSelector';

export const ToastVotation = () => {
    const { animeList, configuration: { cantidad } } = useAppSelector(state => state.anime);
    const [show, setShow] = useState(true);
    const handleShow = () => {
        setShow(false);
    }
    useEffect(() => {
        console.log(animeList.length, cantidad * 1);
    }, [])

    return (
        <div
            className={`toast__votation left-1/2 transform -translate-x-1/2 transition ${animeList.length === cantidad * 1
                ? 'translate-y-0' : 'translate-y-28'}`}
        >
            <div className="font-semibold">
                <p>
                    Llegaste al limite de Animes
                </p>
                <p>
                    {animeList.length}/{cantidad}
                </p>
            </div>
            <button
                className="btn__toast"
                onClick={handleShow}
            >
                <i className="fas fa-times"></i>
            </button>
        </div>
    )
}
