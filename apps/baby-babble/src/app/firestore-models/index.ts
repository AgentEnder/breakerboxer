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

export interface ExchangeToken {
  targetUser: string;
  active: boolean;
  createdOn: Date;
  removedOn: Date;
}
