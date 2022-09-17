import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Stadistics, VotationLayout } from '../../components'
import { useAppSelector, useVotation } from '../../hooks';

export const VotationPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getVotation, handleVotation } = useVotation();
    const [show, setShow] = useState(true);
    const { votation: data, alreadyVoted } = useAppSelector(state => state.votation);
    const { items, votation } = data;
    const isVoted = alreadyVoted.includes(votation?.uid);
    const currentDate = new Date(votation?.date);
    const [slected, setSlected] = useState<string[]>([]);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setSlected([...slected, value]);
        }
        else {
            setSlected(slected.filter(item => item !== value));
        }
    }
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleVotation(slected, votation.uid);
    }
    useEffect(() => {
        console.log('votation page', id);
        if (!id) navigate('/');
        if (id) getVotation(id);
    }, [])
    // En esta página se muestra la lista de animes disponibles
    return (
        <VotationLayout>
            <div className="flex flex-col items-center my-2">
                <div className="w-full flex justify-center gap-1 py-2">
                    <div className="flex w-full max-w-[600px]">
                        <button
                            onClick={() => setShow(true)}
                            className={`py-2 font-semibold flex-grow ${show ? 'bg-violet-500' : 'bg-gray-500'}`}>
                            Votaciones
                            <i className="fas fa-vote-yea pl-2"></i>
                        </button>
                        <button
                            onClick={() => setShow(false)}
                            className={`py-2 font-semibold flex-grow ${show ? 'bg-gray-500' : 'bg-violet-500'}`}>
                            Resultados
                            <i className="fas fa-poll-h pl-2"></i>
                        </button>
                    </div>
                </div>
                {
                    show ?
                        votation && (
                            <div className={`flex flex-col items-center w-full max-w-[600px] relative pb-5`}>
                                <img src={votation.image} alt={votation.title} className="w-full h-full absolute object-cover opacity-10 z-0 pointer-events-none" />
                                <div className='h-3 rounded-xl w-full opacity-90' style={{ background: `${votation.color}` }}></div>
                                <h1 className='text-xl text-center pt-2'>{votation.title}</h1>
                                <p>{votation.description}</p>
                                <p className='text-xs text-gray-500'>Creado por: {votation.creator}</p>
                                <p className='text-xs text-gray-500'>Fecha de creación: {currentDate.toLocaleDateString()}</p>
                                <form onSubmit={handleSubmit} className='w-full'>
                                    <ul className='flex flex-col gap-2 w-full px-4'>
                                        {
                                            items.map((item, i) => (
                                                <li key={item.name} className="flex flex-col z-10 anime__item">
                                                    <input type="checkbox" name={`${i}`} id={`${i}`} value={item.uid}
                                                        disabled={isVoted}
                                                        onChange={handleChange} className="check__anime hidden" />
                                                    <label htmlFor={`${i}`} className="p-2 hover:cursor-pointer border-2 border-transparent hover:border-indigo-600">
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
                                        disabled={isVoted}
                                        className="btn__vote"
                                    >
                                        Votar
                                    </button>
                                    {
                                        isVoted && <p className='text-center text-red-500'>Ya has votado en esta votación</p>
                                    }
                                </form>
                            </div>
                        )
                        : <Stadistics />
                }
            </div>
            <div className="h-20 md:h-10"></div>
        </VotationLayout>
    )
}
