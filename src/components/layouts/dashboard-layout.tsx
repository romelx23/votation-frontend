import React, { FC, useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import Confetti from 'react-confetti';
import { useWindowSize } from '../../hooks/useWindowSize'
import { useUiStore } from '../../store/ui/uiStore';
import { NavbarDashboard } from '../dashboard/navbar-dashboard';
import { SidebarDashboard } from '../dashboard/sidebar-dashboard';

interface DashboardLayoutProps {
    children: React.ReactNode
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    const { isOpen, showConfetti, setConfettiActive } = useUiStore();

    const [theme, setTheme] = useState('light'); // Tema por defecto

    const { width, height } = useWindowSize();


    useEffect(() => {
        // Cargar el tema desde localStorage al iniciar la aplicación
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else {
            const defaultTheme = 'dark';
            setTheme(defaultTheme);
            document.documentElement.setAttribute('data-theme', defaultTheme);
        }
        console.log(theme);
    }, []);

    return (
        <div>
            <Toaster richColors />
            <NavbarDashboard />
            <SidebarDashboard />
            {
                showConfetti && (
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={300}
                        onConfettiComplete={() => setConfettiActive(false)}
                        style={{
                            position: 'fixed',
                            zIndex: 1000,
                            top: 0,
                            left: 0
                        }}
                    />
                )
            }
            <div className={`${ isOpen ? 'md:pl-56' : 'pl-0' }`}>
                {children}
            </div>
        </div>
    )
}
