import { Post } from "./Post";

export interface Photo {
  id?: string;
  url?: string;
  postId?: string;
  post?: Post;
  createdAt?: Date;
  updatedAt?: Date;
}
