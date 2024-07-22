import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Stadistics, VotationLayout } from '../../components'
import { useAppSelector, useVotation, useVisible, useAppDispatch } from '../../hooks';
import { StadisticsTopTen } from '../../components/votation/StadisticsTopTen';
import { toast } from 'sonner';
import { setAnimeList, setAnimeListCollection, setConfiguration } from '../../store/slices';
import { format, isBefore } from 'date-fns';
import { es } from 'date-fns/locale/es';

export const VotationPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { getVotation, handleVotation } = useVotation();
    const dispatch = useAppDispatch();

    const [show, setShow] = useState(true);
    const [showTen, setShowTen] = useState(true);

    const { votation: data, alreadyVoted } = useAppSelector(state => state.votation);

    const { items, votation } = data;
    const isVoted = alreadyVoted.includes(votation?.uid);
    // const isVoted = localStorage.getItem('voted') === votation?.uid;

    const currentDate = new Date(votation?.createdAt);
    const expirationDate = new Date(votation?.expiration);
    const [slected, setSlected] = useState<string[]>([]);
    const [toggleInfo, setToggleInfo] = useState(false);
    // const { toggleInfo, counter, isVisible } = useVisible(40, 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;

        // no mas de 5 seleccionados

        if (slected.length >= 5) {
            e.preventDefault();
            toast.error('Solo puedes seleccionar hasta 5 animes');
            return;
        }

        if (checked) {
            setSlected([...slected, value]);
        }
        else {
            setSlected(slected.filter(item => item !== value));
        }
    }
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        // if (votation?.expiration < new Date().toISOString()) {
        if (isBefore(expirationDate, new Date())) {
            toast.error('La votación ha expirado');
            return;
        }

        if (slected.length === 0) {
            toast.error('No has seleccionado ningún anime');
            return;
        }
        if (isVoted) {
            toast.error('Ya has votado en esta votación');
            return;
        }

        handleVotation(slected, votation.uid);
    }

    const handleCopyTemplate = () => {
        // const text = items.map(item => item.name).join('\n');
        // navigator.clipboard.writeText(text);
        // toast.success('Plantilla copiada al portapapeles');

        const animeList = items.map(item => ({
            mal_id: item.mal_id,
            title: item.name,
            image: item.image
        }));

        const formData = {
            name: votation.title,
            description: votation.description,
            image: votation.image,
            cantidad: items.length,
            autor: votation.creator,
            color: votation.color,
            expiration: votation.expiration,
        }

        // setear la configuración del formulario
        dispatch(setConfiguration(formData));
        // setear los animes
        dispatch(setAnimeListCollection(animeList));
        navigate('/seleccionar-tema/anime');
    }

    useEffect(() => {
        console.log('votation page', id);
        if (!id) navigate('/');
        if (id) getVotation(id);
    }, [])
    // En esta página se muestra la lista de animes disponibles

    // console.log(isBefore(new Date(), expirationDate));
    // console.log(isBefore(expirationDate, new Date()));
    return (
        <VotationLayout>
            <div className="flex flex-col items-center my-2">
                <div className="w-full flex justify-center gap-1 py-2">
                    <div className="flex flex-col w-full max-w-[600px]">
                        <div className="flex">
                            <button
                                onClick={() => setShow(true)}
                                className={`py-2 font-semibold flex-grow ${ show ? 'bg-violet-600' : 'bg-gray-600' }`}>
                                Votaciones
                                <i className="fas fa-vote-yea pl-2"></i>
                            </button>
                            <button
                                onClick={() => setShow(false)}
                                className={`py-2 font-semibold flex-grow ${ show ? 'bg-gray-600' : 'bg-violet-600' }`}>
                                Resultados
                                <i className="fas fa-poll-h pl-2"></i>
                            </button>
                        </div>
                        {
                            !show &&
                            <>
                                <div className="flex pt-2 justify-end">
                                    <button
                                        onClick={() => setShowTen(true)}
                                        className={`py-2 font-semibold px-10 ${ showTen ? 'bg-violet-600' : 'bg-gray-600' }`}>
                                        Top 10
                                        <i className="fas fa-vote-yea pl-2"></i>
                                    </button>
                                    <button
                                        onClick={() => setShowTen(false)}
                                        className={`py-2 font-semibold px-10 ${ showTen ? 'bg-gray-600' : 'bg-violet-600' }`}>
                                        Todos los votos
                                        <i className="fas fa-poll-h pl-2"></i>
                                    </button>
                                </div>
                            </>
                        }

                    </div>
                </div>
                {
                    show ?
                        votation && (
                            <div className={`flex flex-col items-center w-full max-w-[600px] relative pb-5`}>
                                <img src={votation.image} alt={votation.title} className="w-full h-full absolute object-cover opacity-10 z-0 pointer-events-none" />
                                <div className='h-3 rounded-xl w-full opacity-90' style={{ background: `${ votation.color }` }}></div>
                                <h1 className='text-2xl text-center pt-2 capitalize'>{votation.title}</h1>
                                <p>{votation.description}</p>
                                <p className='text-base text-gray-500'>Creado por: {votation.creator}</p>
                                <p className='text-base text-gray-500'>Fecha de creación: {
                                    format(currentDate, 'dd/MM/yyyy HH:mm', {
                                        locale: es
                                    })
                                }</p>
                                <p className='text-base text-gray-500'>Fecha de Expiración: {
                                    format(expirationDate, 'dd/MM/yyyy HH:mm')
                                }
                                </p>
                                {
                                    isBefore(expirationDate, new Date()) && <p className='bg-red-600 text-white text-center font-bold leading-4 absolute -rotate-[50deg] -left-4 top-10 px-4 py-1'>
                                        lavotación <br />
                                        ha terminado
                                    </p>
                                }
                                <button
                                    onClick={() => {
                                        setToggleInfo(!toggleInfo)
                                    }}
                                    title='Instrucciones'
                                    className='absolute top-4 right-2 hover:bg-purple-500 py-2 px-2 rounded-full transition-colors'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                </button>

                                {
                                    votation.type_form === 'anime' && (
                                        <button
                                            onClick={handleCopyTemplate}
                                            title='Copiar Plantilla'
                                            className='absolute top-14 right-2 hover:bg-blue-500 py-2 px-2 rounded-full transition-colors'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round" className=""><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
                                        </button>
                                    )
                                }
                                {
                                    toggleInfo && (
                                        <div className={`flex justify-center items-center bg-violet-600 text-white px-2 my-3`}>
                                            <div className="w-full max-w-[500px] p-2 rounded-lg">
                                                <h1 className='text-2xl text-center font-semibold'>Instrucciones</h1>
                                                {/* <span>
                                                    {counter}
                                                </span> */}
                                                <p className='text-base'>- Selecciona los animes que más te gusten y luego presiona el botón votar.</p>
                                                <p className='text-base'>- Puedes seleccionar hasta 5 animes.</p>
                                                <p className='text-base'>- Puedes votar una sola vez por votación.</p>
                                            </div>
                                        </div>
                                    )
                                }

                                <form onSubmit={handleSubmit} className='w-full z-40'>
                                    <ul className='flex flex-col gap-2 w-full px-4'>
                                        {
                                            items.map((item, i) => (
                                                <li key={item.name} className="flex flex-col z-10 anime__item">
                                                    <input type="checkbox" name={`${ i }`} id={`${ i }`} value={item.uid}
                                                        disabled={isVoted}
                                                        onChange={handleChange} className="check__anime hidden" />
                                                    <label htmlFor={`${ i }`} className="p-2 hover:cursor-pointer border-2 border-transparent hover:border-indigo-600">
                                                        <div className="flex justify-between items-center font-semibold">
                                                            <p>{item.name}</p>
                                                            <img src={item.image} alt={item.name} className="w-28 h-36 object-cover" />

                                                        </div>
                                                        {/* <button
                                                        className="bg-blue-500 text-white px-2 py-1 rounded-md w-full mt-2"
                                                    >
                                                        Seleccionar
                                                    </button> */}
                                                    </label>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <button
                                        type="submit"
                                        // disabled={isVoted || slected.length === 0}
                                        className="btn__vote"
                                    >
                                        Votar
                                    </button>
                                    {
                                        isVoted && <p className='text-center text-green-500 pt-3'>Ya has votado en esta votación</p>
                                    }
                                    {
                                        slected.length === 0 && isVoted && <p className='text-center text-red-500 pt-3'>No has seleccionado ningún anime</p>
                                    }
                                </form>
                            </div>
                        )
                        : (
                            showTen ?
                                // <Stadistics topTen={true} />
                                <StadisticsTopTen />
                                :
                                <Stadistics />
                        )
                }
            </div>
            <div className="h-20 md:h-10"></div>
        </VotationLayout>
    )
}
