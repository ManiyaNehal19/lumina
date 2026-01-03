export type UserData = {
    id: string,
    firstName: string,
    imageUrl: string,
    hasImage: boolean,
  };
export type Card={
  front:string,
  back:string
}
export type flashcard={
  topic:string,
  content: Card[],
  createdAt: Date,
  flashcardID: string
}
