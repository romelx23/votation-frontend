import { FC, useContext, useEffect, useReducer } from "react";
import { Votation, VotationResponse, Votations } from "../../interfaces";
import { VoteContext, VoteReducer } from "../index";
// import.meta.env.BASE_URL;

interface Props {
  children: React.ReactNode;
}

export interface VoteState {
  votations: Votations[];
}

export const Vote_INITIAL_STATE: VoteState = {
  votations: [],
};

export const VoteProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(VoteReducer, Vote_INITIAL_STATE);

  const setVotation = (votations: Votations[]) => {
    console.log("setVotation", votations);
    dispatch({ type: "[Votation] - Set Votes", payload: votations });
  };

  return (
    <VoteContext.Provider
      value={{
        ...state, setVotation
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};
