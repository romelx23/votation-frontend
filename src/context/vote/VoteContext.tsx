import { createContext } from 'react';
import { Votation, Votations } from '../../interfaces';

interface ContextProps {
    votations: Votations[];
    setVotation: (votation: Votations[]) => void;
}

export const VoteContext = createContext({} as ContextProps)