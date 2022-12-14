"use client";

import { useRef } from "react";

export default function ImportCard({
  importCard,
}: {
  importCard: (
    content: string,
    isReversed: boolean,
    lineSep: string,
    cardSep: string
  ) => Promise<void>;
}) {
  const importRef = useRef<HTMLTextAreaElement>(null);
  const isAnswerFirstRef = useRef<HTMLInputElement>(null);
  const lineSepRef = useRef<HTMLInputElement>(null);
  const cardSepRef = useRef<HTMLInputElement>(null);

  const importListener = async () => {
    await importCard(
      importRef?.current?.value || "",
      isAnswerFirstRef.current?.checked || false,
      lineSepRef.current?.value || "\n\n",
      cardSepRef.current?.value || " - "
    );
  };

  return (
    <>
      <div className="flex gap-4 p-3">
        <input type="checkbox" id="order" name="order" />
        <label htmlFor="order">Answer first</label>
      </div>
      <div className="grid gap-5 py-3 md:grid-cols-2">
        <input
          type="text"
          className="rounded-xl border border-neutral-700 bg-transparent px-3 py-2 focus:outline-none"
          placeholder="Line separator (default \n\n)"
        />
        <input
          type="text"
          className="rounded-xl border border-neutral-700 bg-transparent px-3 py-2 focus:outline-none"
          placeholder="Question and answer separator (default ' - ')"
        />
      </div>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        ref={importRef}
        className="rounded-xl bg-neutral-700 p-2 text-white focus:outline-none"></textarea>
      <button
        onClick={importListener}
        type="button"
        className="my-6 inline-block rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-600 focus:outline-none">
        Import
      </button>
    </>
  );
}
