import { Photo } from "./Photo";

export interface Post {
  authorId?: string;
  comments?: Comment[];
  content?: string;
  createdAt?: Date;
  id?: string;
  postPhotos?: Photo[];
  published?: boolean;
  title?: string;
  updatedAt?: Date;
  //Need to include in the database
  rating?: number;
}
// export interface Post {
//   postId?: string;
//   userId?: string;
//   postPhotos?: Photo[];
//   title?: string;
//   address?:string;
//   imageUrl?:string;
//   caption?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   rating: number;
// }
