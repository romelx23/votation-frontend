
import NavbarHome from "../../components/home/navbar-home";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useUiStore } from "../../store/ui/uiStore";
import Confetti from 'react-confetti';
import { Toaster } from "sonner";
import { FooterHome } from "../home/footer-home";

interface LayoutHomeProps {
    children: React.ReactNode;
}
export const HomeLayout = ({ children }: LayoutHomeProps) => {
    const { showConfetti, setConfettiActive } = useUiStore();
    const { width, height } = useWindowSize();
    return (
        <div>
            <Toaster richColors />
            <NavbarHome />
            <main>{children}</main>
            <FooterHome />
            <Toaster richColors />
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
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            overflow: 'hidden',
                            pointerEvents: 'none',
                        }}
                    />
                )
            }
        </div>
    )
}
