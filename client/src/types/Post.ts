export interface Post {
  postId?: string;
  userId?: string;
  imageUrl: string;
  address: string;
  caption?: string;
  createdAt?: Date;
  updatedAt?: Date;
  rating: number;
}
