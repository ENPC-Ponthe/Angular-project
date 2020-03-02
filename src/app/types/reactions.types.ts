export enum Reaction {
  NONE = 'NONE',
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
  LOVE = 'LOVE',
  HAPPY = 'HAPPY',
  SAD = 'SAD'
}

export interface FavoritePic {
  own_reaction: Reaction;
  name: string;
  file_path: string;
  image: string;
}

export interface GetRandomUserReactionsResponse {
    reactions: FavoritePic[];
}

export interface GetAllUserReactionsResponse {
    number_of_reactions: number;
    reactions: FavoritePic[];
}
