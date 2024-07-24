import React from 'react'

export const ButtonTop = () => {
    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const handleScrollBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className='flex gap-2 z-40 fixed md:bottom-2 right-2 bottom-20'>
            <button
                onClick={handleScrollBottom}
                title='Ir abajo'
                className='btn h-12 md:h-16'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8 stroke-2 scale-125">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                </svg>
            </button>
            <button
                onClick={handleScroll}
                title='Ir arriba'
                className='btn h-12 md:h-16'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-8 stroke-2 scale-125">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                </svg>
            </button>
        </div>
    )
}
