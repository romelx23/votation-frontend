import { Votation, IVotations } from "../../interfaces";
import { VoteState } from "./VoteProvider";

type VoteActionType = { type: "[Votation] - Set Votes"; payload: IVotations[] };

export const VoteReducer = (
  state: VoteState,
  action: VoteActionType
): VoteState => {
  switch (action.type) {
    case "[Votation] - Set Votes":
      return {
        ...state,
        votations: action.payload,
      };

    default:
      return state;
  }
};
