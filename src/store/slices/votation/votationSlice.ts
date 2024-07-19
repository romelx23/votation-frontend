import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Votation, VotationResponse, IVotations } from "../../../interfaces";

interface InitialState {
  votations: IVotations[];
  votation: VotationResponse;
  alreadyVoted: string[];
}

const initialState: InitialState = {
  votations: [],
  votation: {} as VotationResponse,
  alreadyVoted: [],
};

export const votationSlice = createSlice({
  name: "votations",
  initialState,
  reducers: {
    setVote: (state, action: PayloadAction<IVotations[]>) => {
      console.log("set vote", action.payload);
      state.votations = action.payload;
    },
    setVotation: (state, action: PayloadAction<VotationResponse>) => {
      // console.log("set votation", action.payload);
      state.votation = action.payload;
    },
    setAlreadyVoted: (state, action: PayloadAction<string>) => {
      state.alreadyVoted = [...state.alreadyVoted, action.payload];
    },
  },
});

export const { setVote, setVotation, setAlreadyVoted } = votationSlice.actions;

export default votationSlice.reducer;
