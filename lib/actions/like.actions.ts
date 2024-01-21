'use server'

import { likeParams } from "@/types"
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Thread from "../database/models/thread.model";
import Like from "../database/models/like.model";

export const userLikeThread = async ({ threadId, userId, isLiked }: likeParams) => {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error("Author not found");
    }

    const thread = await Thread.findById(threadId);

    if (!thread) {
      throw new Error("Thread not found");
    }

    const existingLike = await Like.findOne({ thread: threadId, author: userId });

    if (existingLike) {
      if (!isLiked) {
        await Like.findByIdAndDelete(existingLike);
      }
    } else {
      if (isLiked) {
        await Like.create({ thread: threadId, author: userId });
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to perform like action");
  }
}

export const alreadyLike = async ({ threadId, userId }: likeParams) => {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error("Author not found");
    }

    const thread = await Thread.findById(threadId);

    if (!thread) {
      throw new Error("Thread not found");
    }

    const existingLike = await Like.findOne({ thread: threadId, author: userId });

    return JSON.parse(JSON.stringify(existingLike));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to perform like action");
  }
}