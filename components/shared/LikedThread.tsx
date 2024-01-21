'use client'
import { alreadyLike, userLikeThread } from "@/lib/actions/like.actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type likedThreadProps = {
  threadId: string;
  userId: string;
}

const LikedThread = ({ threadId, userId }: likedThreadProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const isAlreadyLike = async () => {
      const liked = await alreadyLike({ threadId, userId });
      if (liked) {
        setIsLiked(true);
      }
    }
    isAlreadyLike();
  })

  async function likedButton(isLiked: boolean) {
    try {
      setIsButtonDisabled(true);
      await userLikeThread({ threadId, userId, isLiked: !isLiked });
      setIsLiked(!isLiked);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Button className={`bg-zinc-800 h-fit w-fit p-1 rounded-md cursor-pointer hover:bg-zinc-700 ${isButtonDisabled ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => likedButton(isLiked)}>
      {isLiked ? (
        <Image src="/assets/icons/like-yes.png" alt="like-yes" width={30} height={30} onClick={() => setIsLiked(false)} />
      ) : (
        <Image src="/assets/icons/like-none.png" alt="like-none" width={30} height={30} onClick={() => setIsLiked(true)} />
      )}
    </Button>
  )
}

export default LikedThread