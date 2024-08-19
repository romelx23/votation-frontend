import { FC } from "react";
import { useAuthStore } from "../../store/auth/authStore";
import { IRoles } from "../../interfaces";
import { DashboardLayout } from "./dashboard-layout";
interface RolesLayoutProps {
    children: React.ReactNode;
    roles: IRoles[];
}

export const RolesLayout: FC<RolesLayoutProps> = ({ children, roles }) => {
    const { user } = useAuthStore();
    return (
        <>
            {
                roles.includes(user?.role as IRoles) ? (
                    <>{children}</>
                ) : (
                    <DashboardLayout>
                        <div className="w-full min-h-screen flex justify-center items-center">Unauthorized</div>
                    </DashboardLayout>
                )
            }
        </>
    );
}