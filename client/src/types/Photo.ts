/**
 *   id        String   @id @unique @default(uuid())
  url       String
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

 */

import { Post } from "./Post";

export interface Photo {
  id?: string;
  url?: string;
  postId?: string;
  post?: Post;
  createdAt?: Date;
  updatedAt?: Date;
}
