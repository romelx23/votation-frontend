import { useContext, useState } from "react";
import { SocketContext } from "../context";
import { clearAnimeList, setAlreadyVoted, setConfettiActive, setVotation, setVote } from "../store/slices";
import { useAppDispatch } from "./redux/useAppDispatch";
import { useAppSelector } from "./redux/useAppSelector";
import { votationApi } from '../api/config';
import { useNavigate } from "react-router-dom";
import { GetVotation, ResGetVotations, Votation, VotationResponse } from "../interfaces";
import { toast } from "sonner";

export const useVotation = () => {
    const { animeList, show, configuration } = useAppSelector(state => state.anime);
    const dispatch = useAppDispatch();
    const { createVotation, incrementVote } = useContext(SocketContext);
    const navigate = useNavigate();

    // function for anime votation
    const handleCreateVotationAnime = () => {

        // animeList.length < cantidad * 1 || animeList.length === 0

        console.log(animeList.length);
        console.log(configuration.cantidad * 1);
        console.log(animeList.length);

        if (animeList.length !== configuration.cantidad * 1 || animeList.length === 0) {
            toast.error(`Debes seleccionar ${ configuration.cantidad } animes`);
            return;
        }

        if (animeList.length > configuration.cantidad * 1) {
            toast.error(`Solo puedes seleccionar ${ configuration.cantidad } animes`);
            return;
        }

        const votation: Votation = {
            title: configuration.name,
            description: configuration.description,
            image: configuration.image,
            color: configuration.color,
            creator: configuration.autor,
            expiration: configuration.expiration,
            type_form: 'anime',
            items: animeList.map(anime => ({
                name: anime.title,
                image: anime.image,
                mal_id: anime.mal_id
            }))
        }
        createVotation(votation);
        dispatch(clearAnimeList());
        toast.success('Votación creada con éxito');
        navigate('/');
        dispatch(setConfettiActive(true));
        localStorage.removeItem('form');
    }

    const handleUpdateVotationAnime = async (id: string) => {
        const votation: Votation = {
            title: configuration.name,
            description: configuration.description,
            image: configuration.image,
            color: configuration.color,
            creator: configuration.autor,
            expiration: configuration.expiration,
            type_form: 'anime',
            items: animeList.map(anime => ({
                name: anime.title,
                image: anime.image,
                mal_id: anime.mal_id
            }))
        }

        try {
            const { data: votationsData } = await votationApi.put<ResGetVotations>(`/votation/${ id }`, {
                votation
            }); // Fetch categories
            console.log({ votationsData });

            dispatch(clearAnimeList());
            toast.success('Votación actualizada con éxito');

            dispatch(setConfettiActive(true));
            localStorage.removeItem('form');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getVotation = async (id: string) => {
        try {
            const data = await votationApi.get<VotationResponse>(`/votation/${ id }`);
            const resp = data.data;
            console.log(resp);
            dispatch(setVotation(resp));
            return resp;
        } catch (error) {
            // navigate('/');
            return null;
        }
    }

    const getVotations = async (limit: number = 10, skip: number = 0, search: string = '') => {
        try {
            const data = await votationApi.get<ResGetVotations>(`/votation/?limit=${ limit }&offset=${ skip }&search=${ search }`);
            const resp = data.data;
            console.log(resp);
            dispatch(setVote(resp.votations));
            return resp.total;
        } catch (error) {
            navigate('/');
        }
    }

    const handleVotation = async (votesId: string[], idVote: string) => {
        // id de los animes que se votaron
        incrementVote(votesId, idVote);
        // id de la votación
        dispatch(setAlreadyVoted(idVote))
        // localStorage.setItem('voted', idVote);
    }

    // function for normal votation
    const handleCreateVotation = (votation: Votation) => {
        createVotation(votation);
    }

    return {
        handleCreateVotationAnime,
        getVotation,
        getVotations,
        handleVotation,
        handleCreateVotation,
        setConfettiActive,
        handleUpdateVotationAnime
    }
}