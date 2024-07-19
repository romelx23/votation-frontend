type typeForm = "anime" | "general";

export interface Votation {
  title: string;
  description: string;
  color: string;
  creator: string;
  image: string;
  expiration: string;
  type_form: typeForm;
  items: Item[];
}

export interface Item {
  name: string;
  image: string;
  mal_id?: number;
}

export interface IVotations {
  uid: string;
  title: string;
  description: string;
  image: string;
  color: string;
  creator: string;
}

export interface VotationResponse {
  votation: {
    title: string;
    description: string;
    image: string;
    color: string;
    creator: string;
    status: boolean;
    // date: string;
    expiration: string;
    type_form: typeForm;
    createdAt: string;
    updatedAt: string;
    uid: string;
  };
  items: ItemsResponse[];
}

export interface ResGetVotations {
  total: number;
  votations: IVotations[];
}

export interface ItemsResponse {
  name: string;
  image: string;
  votes: number;
  uid: string;
  votation: string;
  mal_id: number;
}

export interface GetVotation {
  items: ItemsResponse[];
  votations: IVotations;
}

export interface ISelectedAnime {
  title: string;
  image: string;
  mal_id: number;
}
