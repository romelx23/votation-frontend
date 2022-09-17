export interface Votation {
  title: string;
  description: string;
  color: string;
  creator: string;
  image: string;
  items: Item[];
}

export interface Item {
  name: string;
  image: string;
}

export interface Votations {
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
    date: string;
    uid: string;
  };
  items: ItemsResponse[];
}

export interface GetVotations {
  total: number;
  votations: Votations[];
}

export interface ItemsResponse {
  name: string;
  image: string;
  votes: number;
  uid: string;
  votation: string;
}

export interface GetVotation {
  items: ItemsResponse[];
  votations: Votations;
}
