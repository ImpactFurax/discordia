'use server'

import { CreateCommentParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Comment from "../database/models/comment.model";
import { revalidatePath } from "next/cache";

const populateComment = async (query: any) => {
  return query
  .populate({ path: 'author', model: User, select: '_id username photo'})
}

export const createComment = async ({comment, userId, threadId, path}: CreateCommentParams) => {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if(!author) {
      throw new Error("Author not found");
    }
    const newComment = await Comment.create({ comment, author: userId, thread: threadId});
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newComment))
  } catch (error) {
    console.log(error);
  }
}

export const getCommentsByThreadId = async (threadId: string) => {
  try {
    await connectToDatabase();

    const comments = await populateComment(Comment.find({thread: threadId}));

    if(!comments) {
      throw new Error("No comments found");
    }
    return JSON.parse(JSON.stringify(comments))
  } catch (error) {
    console.log(error);
  }
}