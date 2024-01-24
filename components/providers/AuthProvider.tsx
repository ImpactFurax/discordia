'use client'

import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react";

type ProviderProps = {
  role: string;
  children: ReactNode
}

const AuthProvider = ({ role, children }: ProviderProps) => {
  const { isSignedIn } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (role === 'user' || !isSignedIn) {
      router.push('/');
    }

    if (role === 'admin' && isSignedIn) {
      router.push('/admin/dashboard')
    }
  }, [role, isSignedIn, router]);

  return children;
}

export default AuthProvider;