import { ClipboardIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";

export default function CopyButton({ copy }: { copy(): void }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const listener = async () => {
    setIsCopied((isCopied) => !isCopied);
    copy();
    setTimeout(() => {
      setIsCopied((isCopied) => !isCopied);
    }, 500);
  };

  return (
    <div
      className="flex h-16 cursor-pointer items-center gap-2 rounded-2xl bg-neutral-800 pl-5 pr-7 text-xl text-white hover:bg-neutral-700 focus:outline-none md:h-10 md:rounded-full md:text-sm"
      onClick={listener}>
      {!isCopied ? (
        <ClipboardIcon className="h-6 w-6 text-neutral-300 md:h-4 md:w-4" />
      ) : (
        <CheckIcon className="h-6 w-6 text-neutral-300 md:h-4 md:w-4" />
      )}
      <p ref={textRef}>Copy</p>
    </div>
  );
}
