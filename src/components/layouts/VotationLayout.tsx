import React, { FC } from 'react'
import { BottomBar } from '../ui/BottomBar'
import { Navbar } from '../ui/Navbar'
import { ButtonTop } from '../votation/ButtonTop'

interface Props {
    children: React.ReactNode
}

export const VotationLayout: FC<Props> = ({ children }) => {
    return (
        <div className='min-h-screen w-full transition-opacity'>
            <Navbar />
            {children}
            <BottomBar />
            <ButtonTop />
        </div>
    )
}
