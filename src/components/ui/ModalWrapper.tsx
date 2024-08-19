import React from 'react'
// import { useAppSelector } from '../../hooks/redux/useAppSelector';
// import { useAppDispatch } from '../../hooks/redux/useAppDispatch';
// import { deleteAnime, setShow } from '../../store/slices';
// import { useUi, useVotation } from '../../hooks';
// import { Anime, ISelectedAnime } from '../../interfaces';

interface ModalAnimeProps {
    leftTitle: string;
    centerTitle?: string;
    children: React.ReactNode;
    // show: boolean;
    isOpen: boolean;
    onClose: () => void;
}

export const ModalWrapper = ({
    leftTitle,
    centerTitle,
    children,
    // show,
    isOpen,
    onClose
}: ModalAnimeProps) => {

    return (
        <>
            <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-75 ${ isOpen ? '' : 'hidden' }`}
                onClick={onClose}
            >
            </div>
            <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col justify-center p-2 max-w-2xl overflow-hidden transition-all transform bg-gray-800 rounded-lg shadow-xl h-[80vh] my-3 mx-2 z-[60] ${ isOpen ? '' : 'hidden' }`}>
                <div className="flex absolute top-4 left-3">
                    {
                        leftTitle
                    }
                </div>
                <h1 className='text-center font-semibold text-lg pt-3'>{centerTitle}</h1>
                <button
                    title='Cerrar'
                    className='btn absolute top-3 right-2'
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
                <div className="modal__anime__content__animes">
                    {children}
                </div>
            </div>
        </>
    )
}
