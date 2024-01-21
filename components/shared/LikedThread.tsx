'use client'
import { alreadyLike, userLikeThread } from "@/lib/actions/like.actions";
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
    isAlreadyLike();
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

      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <p></p>
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
    </>
  )
}

export default LikedThread