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

export interface ChoiceRecord {
  name: string;
  updatedDate: Date;
}

export interface NameMetadata {
  totalLikes: number;
  totalDislikes: number;
  gender: 'male' | 'female' | 'agnostic';
}
