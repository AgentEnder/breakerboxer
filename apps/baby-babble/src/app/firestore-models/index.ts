import { User } from '@tbs/user';

export interface BabyBabbleDatabase {
  users: {
    [keyId: string]: BabyBabbleUser;
  };
  names: { [keyId: string]: NameMetadata };
}

export type BabyBabbleUser = User & {
  appData: BabyBabbleUserData;
};

export interface BabyBabbleUserData {
  likes: string[];
  dislikes: string[];
}

export interface ChoiceRecord extends Choice {
  updatedDate: Date;
}

export interface Choice {
  name: string;
  strength?: number;
}

export interface NameMetadata {
  totalLikes: number;
  totalDislikes: number;
  gender: 'male' | 'female' | 'agnostic';
}
