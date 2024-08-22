export interface IDashboardResponse {
  votesByVotation: VotesByVotation[];
  countVotosPorVotacion: number;
  totalVotationsCreated: number;
  votationsByMonth: VotationsByMonth[];
}

export interface VotationsByMonth {
  _id: ID;
  count: number;
}

export interface ID {
  year: number;
  month: number;
}

export interface VotesByVotation {
  _id: string;
  totalVotos: number;
  createdAt: Date;
}
