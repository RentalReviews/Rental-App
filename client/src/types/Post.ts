import { Photo } from "./Photo";

export interface Post {
  authorId: string;
  comments: Comment[];
  content: string;
  createdAt: Date;
  id: string;
  postPhotos: Photo[];
  published: boolean;
  title: string;
  updatedAt: Date;
  //Need to include in the database
  rating: number;
}
