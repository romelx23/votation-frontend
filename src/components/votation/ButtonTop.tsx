import React from 'react'

export const ButtonTop = () => {
    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return (
        <button
            onClick={handleScroll}
            title='Ir arriba'
            className='btn fixed bottom-2 right-2'>
            <i className="fas fa-arrow-up"></i>
        </button>
    )
}
