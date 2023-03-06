export interface Comment {
  commentID?: string;
  postID?: string;
  userID?: string;
  comment: string;
  createAt?: Date;
  updatedAt?: Date;
  likes?: number;
}
