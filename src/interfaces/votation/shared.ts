import { typeForm } from "./votation";

export interface IVotationSharedResponse {
  ok: boolean;
  votations: VotationElement[];
}

export interface VotationElement {
  votation: VotationVotation;
  owner: string;
  sharedWith: string;
  canView: boolean;
  canEdit: boolean;
  createdAt: Date;
  updatedAt: Date;
  uid: string;
}

export interface VotationVotation {
  _id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  type_form: typeForm;
  creator: string;
  status: boolean;
  expiration: Date;
  visibility: boolean;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
