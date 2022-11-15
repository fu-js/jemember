"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseGetCurrentUser, supabaseSignOut } from "utils";

export default function Nav() {
  const router = useRouter();
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    supabaseGetCurrentUser().then((user) => {
      if (user) setUser(user);
    });
  }, []);

  const logout = async () => {
    const { error } = await supabaseSignOut();
    if (error) {
      console.error(error);
    }
    setUser({} as User);
    router.push("/");
  };

  let lastScrollTop = document.documentElement.scrollTop;

  document.addEventListener(
    "scroll",
    () => {
      let st = document.documentElement.scrollTop;
      let up = document.getElementById("nav-title-up");
      let down = document.getElementById("nav-title-down");
      if (st > lastScrollTop) {
        // down
        up?.classList.replace("right-0", "right-10");
        up?.classList.replace("opacity-1", "opacity-0");
        down?.classList.replace("left-0", "-left-[8.5rem]");
        down?.classList.replace("opacity-0", "opacity-1");
      } else {
        // up
        up?.classList.replace("right-10", "right-0");
        up?.classList.replace("opacity-0", "opacity-1");
        down?.classList.replace("-left-[8.5rem]", "left-0");
        down?.classList.replace("opacity-1", "opacity-0");
      }
      lastScrollTop = st <= 0 ? 0 : st;
    },
    false
  );

  return (
    <header className="fixed top-0 z-[99] w-full border-b border-gray-700 bg-gray-900">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-5 py-6">
        <h1 className="text-3xl font-semibold">
          <Link href="/" className="flex">
            <p className="text-red-500">J</p>
            <p
              id="nav-title-up"
              className="opacity-1 relative right-0 transition-all duration-300"
            >
              emember
            </p>
            <div
              id="nav-title-down"
              className="relative left-0 flex gap-2 opacity-0 transition-all duration-300"
            >
              <p className="text-red-500">S</p>
              <p>Club</p>
            </div>
          </Link>
        </h1>
        {!user.id && (
          <div className="flex gap-5">
            <Link href="/login">Log in</Link>
            <Link href="/signup">Sign up</Link>
          </div>
        )}
        {user.id && (
          <div className="flex gap-5">
            <p>{user.email}</p>
            <button onClick={logout}>Log out</button>
          </div>
        )}
      </div>
    </header>
  );
}
