import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { SelectedAnime, SelectedPokemon } from '../components';
import { CreateVotation, HomePage, NotFoundPage, SelectedPage, VotationPage, DashboardSettings, DashboardGeneral, DashboardVotation, Dashboarduser } from '../pages';
import { Protected, Redirect } from './protected-routes';
import { RolesLayout } from "../components/layouts/roles-layout";
import Login from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
export const DashboardRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/seleccionar-tema' element={<SelectedPage />} />
                <Route path='/seleccionar-tema/anime' element={<SelectedAnime />} />
                <Route path='/seleccionar-tema/pokemon' element={<SelectedPokemon />} />
                <Route path='/seleccionar-tema/crear' element={<CreateVotation />} />
                <Route path='/votar/:id' element={<VotationPage />} />

                <Route element={<Protected />}>
                    {/* all view routes */}
                    <Route path="dashboard" element={<DashboardGeneral />} />
                    <Route
                        path="dashboard/crear-votacion"
                        element={
                            <DashboardVotation />
                        }
                    />
                    <Route path="dashboard/settings" element={<DashboardSettings />} />
                    {/* only admin view routes */}
                    <Route
                        path="dashboard/usuarios"
                        element={
                            <RolesLayout roles={["ADMIN_ROLE"]}>
                                <Dashboarduser />
                            </RolesLayout>
                        }
                    />

                </Route>

                <Route
                    path="auth"
                    // loader={async () => await isAuthenticated()}
                    element={<Redirect />}
                >
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}
