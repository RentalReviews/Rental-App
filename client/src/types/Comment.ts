export interface Comment {
  readonly id: string;
  content: string;
  readonly authorId: string;
  readonly author: {
    displayName: string;
  };
  postId: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
