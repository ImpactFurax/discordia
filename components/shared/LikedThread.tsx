'use client'
import { alreadyLike, numberOfLikeByThreadId, userLikeThread } from "@/lib/actions/like.actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSession } from "@clerk/nextjs";
import Popup from "./Popup";

type likedThreadProps = {
  threadId: string;
  userId: string;
}

const LikedThread = ({ threadId, userId }: likedThreadProps) => {
  const { isSignedIn } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [nbLikes, setNbLikes] = useState(0);

  useEffect(() => {
    const isAlreadyLike = async () => {
      if (isSignedIn) {
        try {
          const liked = await alreadyLike({ threadId, userId });
          if (liked) {
            setIsLiked(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    const likes = async () => {
      const countLikes = await numberOfLikeByThreadId(threadId)
      setNbLikes(countLikes);
    }
    isAlreadyLike();
    likes();
  }, [isSignedIn, threadId, userId])

  async function likedButton(isLiked: boolean) {
    if (!isSignedIn) {
      setIsLiked(false);
      setIsPopupOpen(true);
      return;
    }
    try {
      setIsButtonDisabled(true);
      await userLikeThread({ threadId, userId, isLiked: !isLiked });
      setIsLiked(!isLiked);

      const countLikes = await numberOfLikeByThreadId(threadId);
      setNbLikes(countLikes);

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex items-center gap-2">
      <p className="font-bold">{nbLikes}</p>
      <Button className={`bg-zinc-800 h-fit w-fit p-1 rounded-md cursor-pointer hover:bg-zinc-700 ${isButtonDisabled ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => likedButton(isLiked)}>
        {isLiked ? (
          <Image src="/assets/icons/like-yes.png" alt="like-yes" width={30} height={30} onClick={() => setIsLiked(false)} />
        ) : (
          <Image src="/assets/icons/like-none.png" alt="like-none" width={30} height={30} onClick={() => setIsLiked(true)} />
        )}
      </Button>
      {!isSignedIn && (
        <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  )
}

export default LikedThread