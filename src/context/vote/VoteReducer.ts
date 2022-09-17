import { Votation, Votations } from "../../interfaces";
import { VoteState } from "./VoteProvider";

type VoteActionType = { type: "[Votation] - Set Votes"; payload: Votations[] };

export const VoteReducer = (
  state: VoteState,
  action: VoteActionType
): VoteState => {
  switch (action.type) {
    case "[Votation] - Set Votes":
      return {
        ...state,
      };

    default:
      return state;
  }
};
