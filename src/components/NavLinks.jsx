'use client'
import { CircleUserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Logout from "./Logout";
import Image from "next/image";

const NavLinks = ({userName}) => {
  return (
    <ul className="flex pt-1">
      {userName ? (
        <li className="flex">
          <Link href="/dashboard">
            {session?.user?.image ? (
              <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={25}
                height={25}
                className="rounded-full"
              />
            ) : (
              <CircleUserRound />
            )}
          </Link>
          <span className="mx-1">|</span>
          <Logout />
        </li>
      ) : (
        <>
          <li className="mx-2">
            <Link href="/login">Login</Link>
          </li>
          <li className="mx-2">
            <Link href="/register">Register</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
