"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react"


export const LandingNavbar = () => {

  const { data: session, status } = useSession()

  console.log('@@@', status);

  const isSignedIn = status === "authenticated"

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <Image fill alt="Logo" src="/astronaut.png" />
        </div>
        <h1 className={"text-2xl font-bold text-white"}>Genius</h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/login"}>
          <button variant="outline" className="rounded-full">
            {isSignedIn ? "Dashboard" : "Login"}
          </button>
        </Link>
      </div>
    </nav>
  );
};
