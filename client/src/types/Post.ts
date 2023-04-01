import { Photo } from "./Photo";

export interface Post {
  readonly id: string;
  title: string;
  content: string;
  published: boolean;
  rating: number;
  readonly authorId: string;
  readonly author: {
    displayName: string;
  };
  readonly comments: Comment[];
  postPhotos: Photo[];
  readonly createdAt: string;
  readonly updatedAt: string;
}
