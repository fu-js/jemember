"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RouterSearch() {
  const router = useRouter();
  const [keyWord, setKeyWord] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(keyWord ? `/?term=${keyWord}` : "/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex gap-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          onChange={(e) => setKeyWord(e.currentTarget.value)}
          value={keyWord}
          type="search"
          size={40}
          placeholder="Collections' name"
          className="block w-full rounded-lg border border-neutral-600 bg-neutral-800 py-3 pl-10 text-white placeholder-neutral-500 focus:outline-none"
        />
        <button type="submit" className="rounded-lg bg-neutral-800 px-4">
          Search
        </button>
      </div>
    </form>
  );
}
