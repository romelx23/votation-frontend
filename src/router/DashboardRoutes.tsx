import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { SelectedAnime, SelectedPokemon } from '../components';
import { CreateVotation, HomePage, NotFoundPage, SelectedPage, VotationPage } from '../pages';
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
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    )
}
