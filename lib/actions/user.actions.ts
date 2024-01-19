"use server"

import { CreateUserParams, UpdateUserParams } from "@/types"
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";
import Thread from "../database/models/thread.model";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase()

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true })

    if (!updatedUser) throw new Error('User update failed')
    return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
   console.log(error);
   
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase()

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId })

    if (!userToDelete) {
      throw new Error('User not found')
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id)
    revalidatePath('/')

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
  } catch (error) {
    console.log(error);
    
  }
}

export async function getUserDataById(clerkId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(clerkId, 'photo username email');
    const nbThreadUser = await Thread.countDocuments({ author: clerkId });
   

    if(!user) {
      throw new Error('User not found');
    }

    const userData = {
      userInfo: user,
      threadUser: nbThreadUser
    }
   
    return JSON.parse(JSON.stringify(userData))
  } catch (error) {
    console.log(error);
  }
}