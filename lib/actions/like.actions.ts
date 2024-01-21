'use server'

import { LikeParams } from "@/types"
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Thread from "../database/models/thread.model";
import Like from "../database/models/like.model";

export const userLikeThread = async ({ threadId, userId, isLiked }: LikeParams) => {
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

export const alreadyLike = async ({ threadId, userId }: LikeParams) => {
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

export const numberOfLikeByThreadId = async (threadId: string) => {
  try {
    await connectToDatabase();

    const thread = await Thread.findById(threadId);

    if (!thread) {
      throw new Error("Thread not found");
    }

    const nbLikes = await Like.countDocuments({thread: threadId});

    return JSON.parse(JSON.stringify(nbLikes));
  } catch (error) {
    console.error(error);
    throw new Error("Failed to perform like action");
  }
}