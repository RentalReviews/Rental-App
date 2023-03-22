export interface Comment {
  id?: string;
  postId?: string;
  authorId?: string;
  content: any;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
}
