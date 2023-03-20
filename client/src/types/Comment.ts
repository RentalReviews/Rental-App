export interface Comment {
  id?: string;
  postId?: string;
  authorId?: string;
  content: string;
  createAt?: Date;
  updatedAt?: Date;
  likes?: number;
}
