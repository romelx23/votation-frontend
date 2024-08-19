import React, { FC } from 'react'
import { BottomBar } from '../ui/BottomBar'
import { Navbar } from '../ui/Navbar'
import { ButtonTop } from '../votation/ButtonTop'
import NavbarHome from '../home/navbar-home'
import { FooterHome } from '../home/footer-home'

interface Props {
    children: React.ReactNode
}

export const VotationLayout: FC<Props> = ({ children }) => {
    return (
        <div className='min-h-screen w-full transition-opacity'>
            <NavbarHome />
            {children}
            <FooterHome />
            <BottomBar />
            <ButtonTop />
        </div>
    )
}
