import { Votation, VotationResponse, Votations, GetVotations } from "../";

export interface ServerToClientEvents {
  noArg: () => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  // "mensaje-from-server": (mensaje: Message) => void;
  // "list-scores": (scores: ScoreResponse) => void;
  // "list-users": (users: UsersResponse) => void;
  // "mensaje-privado": (mensaje: MessagePrivateResponse) => void;
  "get-votations": (votations: GetVotations) => void;
  "get-votation": (votation: VotationResponse) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  // "mensaje-to-server": (mensaje: Message) => void;
  // "new-score": (score: Score) => void;
  // "get-scores": () => void;
  // "get-users": () => void;
  // "connect-user": () => void;
  // "disconnect-user": () => void;
  // "mensaje-privado": (mensaje: MessagePrivate) => void;
  "create-votation": (votation: Votation) => void;
  "get-votations": () => void;
  "increment-vote": (id: string) => void;
  "increment-votes": (Votes: Votes) => void;
}

export interface Votes {
  idVotes: string[];
  idVotation: string;
}
