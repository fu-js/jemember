"use client";

import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { supabaseSignOut } from "utils/supabase/auth/client";

import type { UserMetaData } from "type";
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Nav({ user }: { user: UserMetaData | null }) {
  const isNotRendered = ["login", "signup"].includes(
    useSelectedLayoutSegment() ?? ""
  );

  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabaseSignOut();

    if (error) {
      throw new Error(error.message);
    }

    router.push("/");
  };

  return isNotRendered ? null : (
    <header className="fixed left-0 z-[99] w-screen bg-neutral-800 md:h-full md:w-[5rem] md:bg-transparent">
      <div className="mx-auto flex w-full items-center justify-between gap-3 px-2 md:h-screen md:flex-col md:justify-center">
        <h1 className="p-3 text-3xl font-medium">
          <Link href="/" className="">
            <p className="text-red-500">J</p>
          </Link>
        </h1>

        <Link
          href="/lesson/new"
          className="tooltip rounded-full p-3 after:content-['Add'] hover:bg-green-800/40"
        >
          <PlusIcon className="h-6 w-6" />
        </Link>

        {!user?.id && (
          <>
            <Link
              href="/login"
              className="tooltip rounded-full p-3 after:content-['Login'] hover:bg-green-800/40 "
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
            </Link>
            <Link
              href="/signup"
              className="tooltip rounded-full p-3 after:content-['Signup'] hover:bg-green-800/40"
            >
              <UserPlusIcon className="h-6 w-6" />
            </Link>
          </>
        )}

        {user?.id && (
          <>
            <Link
              href="/profile"
              className="tooltip rounded-full p-3 after:content-['Profile'] hover:bg-green-800/40"
            >
              <UserIcon className="h-6 w-6" />
            </Link>
            <button
              onClick={signOut}
              className="tooltip rounded-full p-3 after:content-['Signout'] hover:bg-green-800/40"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
