import { useContext } from "react";
import { SocketContext } from "../context";
import { clearAnimeList, setAlreadyVoted, setVotation } from "../store/slices";
import { useAppDispatch } from "./redux/useAppDispatch";
import { useAppSelector } from "./redux/useAppSelector";
import { votationApi } from '../api/config';
import { useNavigate } from "react-router-dom";
import { GetVotation, Votation, VotationResponse } from "../interfaces";
export const useVotation = () => {
    const { animeList, show, configuration } = useAppSelector(state => state.anime);
    const dispatch = useAppDispatch();
    const { createVotation, incrementVote } = useContext(SocketContext);
    const navigate = useNavigate();

    const handleSubmmit = () => {
        const votation = {
            title: configuration.name,
            description: configuration.description,
            image: configuration.image,
            color: configuration.color,
            creator: configuration.autor,
            items: animeList.map(anime => ({
                name: anime.title,
                image: anime.images.jpg.image_url
            }))
        }
        createVotation(votation);
        dispatch(clearAnimeList());
    }

    const getVotation = async (id: string) => {
        try {
            const data = await votationApi.get<VotationResponse>(`/${id}`);
            const resp = data.data;
            console.log(resp);
            dispatch(setVotation(resp));
        } catch (error) {
            navigate('/');
        }
    }

    const handleVotation = async (votesId: string[], idVote: string) => {
        // id de los animes que se votaron
        incrementVote(votesId, idVote);
        // id de la votación
        dispatch(setAlreadyVoted(idVote))
    }

    const handleCreateVotation = (votation: Votation) => {
        createVotation(votation);
    }

    return {
        handleSubmmit,
        getVotation,
        handleVotation,
        handleCreateVotation
    }
}