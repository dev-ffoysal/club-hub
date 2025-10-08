import { IUser } from "./interfaces";

export interface MembersItem {
  member: IUser | string;
  position: string;
  note?: string;
}

export interface ICommitteFilterables {
    status?: 'active' | 'inactive';
    year?: number;
}

export interface ICommitte {
  _id: string;
  club: IUser | string;
  from: Date;
  to: Date;
  members: MembersItem[];
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}