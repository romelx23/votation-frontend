import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../context';
import { useAppSelector } from '../../hooks';

export const Votations = () => {
    const { getVotations } = useContext(SocketContext);
    useEffect(() => {
        getVotations();
    }, [])

    const { votations } = useAppSelector(state => state.votation);

    const navigate = useNavigate();

    const handleVotation = (id: string) => {
        navigate(`/votar/${ id }`);
    }

    return (
        <div className="flex items-center flex-col gap-4 py-4 px-2">
            {
                votations.map((votation, i) => (
                    <div
                        onClick={() => handleVotation(votation.uid)}
                        key={votation.uid}
                        className='flex flex-col relative md:h-36 h-32 cursor-pointer w-full sm:w-96 group hover:scale-110 transition-transform'>
                        <div className="absolute flex justify-center items-center w-full h-full font-semibold text-white z-50">
                            <p className='pr-4'>{i + 1})</p>
                            <p>{votation.title}</p>
                        </div>
                        <img src={votation.image ? votation.image : 'https://pbs.twimg.com/media/FcLcDPlXgAITvgp?format=jpg&name=medium'} alt="10-mejores-openings-animes" title='10 mejores openings' className=' w-full h-full opacity-25 object-cover transition duration-300 ease-in-out group-hover:opacity-75' />
                    </div>
                ))
            }
            {/* <div className='flex flex-col relative md:h-28 h-auto cursor-pointer w-full sm:w-96'>
                <div className="absolute flex justify-center items-center w-full h-full font-semibold">
                    <p className='pr-4'>1)</p>
                    <p>Votación 10 Mejores Openings</p>
                </div>
                <img src="https://pbs.twimg.com/media/FcLcDPlXgAITvgp?format=jpg&name=medium" alt="10-mejores-openings-animes" title='10 mejores openings' className=' w-full h-full opacity-25 object-cover' />
            </div>
            <div className='flex flex-col relative md:h-28 h-auto cursor-pointer w-full sm:w-96'>
                <div className="absolute flex justify-center items-center w-full h-full font-semibold">
                    <p className='pr-4'>1)</p>
                    <p>Votación 10 Mejores Openings</p>
                </div>
                <img src="https://pbs.twimg.com/media/FcLcDPlXgAITvgp?format=jpg&name=medium" alt="10-mejores-openings-animes" title='10 mejores openings' className=' w-full h-full opacity-25 object-cover' />
            </div>
            <div className='flex flex-col relative md:h-28 h-auto cursor-pointer w-full sm:w-96'>
                <div className="absolute flex justify-center items-center w-full h-full font-semibold">
                    <p className='pr-4'>1)</p>
                    <p>Votación 10 Mejores Openings</p>
                </div>
                <img src="https://pbs.twimg.com/media/FcLcDPlXgAITvgp?format=jpg&name=medium" alt="10-mejores-openings-animes" title='10 mejores openings' className=' w-full h-full opacity-25 object-cover' />
            </div> */}
            <div className="h-16"></div>
        </div>
    )
}
