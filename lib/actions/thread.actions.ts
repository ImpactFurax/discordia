'use server'

import { CreateThreadParams, DeleteThreadParams, GetAllThreadsParams, GetThreadsByUserParams, UpdateThreadParams } from "@/types"
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

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}

    const conditions = { ...titleCondition }
    
    const skipAmount = (Number(page) - 1) * limit;
    const threadsQuery = Thread.find(conditions)
    .sort({ createdAt: 'desc'})
    .skip(skipAmount)
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

export const deleteThread = async ({threadId, path}: DeleteThreadParams) => {
  try {
    await connectToDatabase();
    
    const deletedThread = await Thread.findByIdAndDelete(threadId);

    if(deletedThread) revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}

export async function updateThread({ userId, thread, path }: UpdateThreadParams) {
  try {
    await connectToDatabase()

    const threadToUpdate = await Thread.findById(thread._id)
    if (!threadToUpdate || threadToUpdate.author.toHexString() !== userId) {
      throw new Error('Unauthorized or thread not found')
    }

    const updatedThread = await Thread.findByIdAndUpdate(
      thread._id,
      { ...thread },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedThread))
  } catch (error) {
    console.log(error);
  }
}

export async function getThreadsByUser({ userId, limit = 6, page, query }: GetThreadsByUserParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const conditions = { ...titleCondition, author: userId }

    const skipAmount = (page - 1) * limit

    const threadsQuery = Thread.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const threads = await populateThread(threadsQuery)
    const threadsCount = await Thread.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(threads)), totalPages: Math.ceil(threadsCount / limit) }
  } catch (error) {
    console.log(error);
  }
}

export const getThreadDataByUserId = async (userId: string) => {
try { 
  try {
    await connectToDatabase();

    const threads = await Thread.countDocuments({ author: userId });

    return JSON.parse(JSON.stringify(threads));
  } catch (error) {
    
  }
} catch (error) {
  console.log(error);
  
}
} 