import { createContext } from 'react';
import { Votation, IVotations } from '../../interfaces';

interface ContextProps {
    votations: IVotations[];
    setVotation: (votation: IVotations[]) => void;
}

export const VoteContext = createContext({} as ContextProps)