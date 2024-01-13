'use server'

import { CreateThreadParams, GetAllThreadsParams } from "@/types"
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Thread from "../database/models/thread.model";
import { revalidatePath } from "next/cache";

const populateThread = async (query: any) => {
  return query
  .populate({ path: 'author', model: User, select: '_id firstName lastName username'})
}

export const createThread = async ({thread, userId, path}: CreateThreadParams) => {
  try {
    await connectToDatabase();

    const author = await User.findById(userId);

    if(!author) {
      throw new Error("Author not found");
    }
    const newThread = await Thread.create({ ...thread, author: userId});
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newThread))
  } catch (error) {
    console.log(error);
    
  }
}

export const getThreadById = async (threadId: string) => {
  try {
    await connectToDatabase();
    
    const thread = await populateThread(Thread.findById(threadId));

    if(!thread) {
      throw new Error('Thread not found');
    }
    return JSON.parse(JSON.stringify(thread));
  } catch (error) {
    console.log(error);
    
  }
}

export const getAllThreads = async ({query, limit = 6, page}: GetAllThreadsParams) => {
  try {
    await connectToDatabase();

    const conditions = {};
    
    const threadsQuery = Thread.find(conditions)
    .sort({ createdAt: 'desc'})
    .skip(0)
    .limit(limit)

    const threads = await populateThread(threadsQuery);
    const threadsCount = await Thread.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(threads)),
      totalPages: Math.ceil(threadsCount / limit)
    }
  } catch (error) {
    console.log(error);
    
  }
}