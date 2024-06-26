import { ChangeEvent, useEffect, useRef, useState } from "react";
import { countWords } from "../helpers/utilities";

import Input from "./Input";
import { File } from "../App";

interface FileViewerProps {
  file: File;
  onClose?: () => void;
}

export default function FileViewer({ file, onClose }: FileViewerProps) {
  const [newContent, setNewContent] = useState<string>("");
  const [occurrences, setOccurrences] = useState<number>(0);
  const [searHistory, setSearchHistory] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (!file) return;

    const regex = new RegExp(`(${searchValue})`, "gi");

    const matches = file.content.match(regex);

    // Occurrences
    const count = searchValue ? (matches ? matches.length : 0) : 0;
    setOccurrences(count);

    const newContent = file.content.replace(
      regex,
      `<mark class="bg-yellow-300 rounded-md">$1</mark>`
    );

    setNewContent(newContent);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue || inputValue.trim() === "") return;
    setSearchHistory((prev) => [inputValue, ...prev]);
  };

  return (
    <section className="flex gap-4 flex-col sm:h-[80vh] sm:flex-row mx-auto justify-center">
      <section className="fade-in flex max-w-screen-md w-full  flex-col rounded-md border border-[#969696]/40 shadow-md">
        <div className="relative flex items-center justify-between rounded-t-md bg-[#F5F5F5] p-1 px-4 text-gray-700">
          <button
            onClick={onClose}
            className="group grid h-4 w-4 place-items-center rounded-full bg-[#FF5F57] hover:bg-[#FF3F3F] focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-colors"
          >
            <svg
              className="text-black/45 hidden group-hover:block group-focus:block"
              width="1rem"
              height="1rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6.793 6.793a1 1 0 0 1 1.414 0L12 10.586l3.793-3.793a1 1 0 1 1 1.414 1.414L13.414 12l3.793 3.793a1 1 0 0 1-1.414 1.414L12 13.414l-3.793 3.793a1 1 0 0 1-1.414-1.414L10.586 12L6.793 8.207a1 1 0 0 1 0-1.414"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <h2 className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
            {file.name}
          </h2>
          <form
            className="flex items-center space-x-1 relative"
            onSubmit={onFormSubmit}
          >
            <div className="relative">
              <Input
                ref={inputRef}
                type="search"
                onChange={onSearch}
                className="reltive min-w-16 rounded-md border border-[#D3D3D3] bg-transparent px-2 py-0.5 text-sm ring-blue-500/20 focus:outline-none focus:ring-2"
                placeholder="Search... "
              />
              <div className="absolute text-xs p-0.5 rounded-md right-0.5 top-0.5 text-slate-400 border border-gray-300 bg-[#F5F5F5]">
                ⌘K
              </div>
            </div>
            <button
              type="submit"
              className="active:from-transparent-black active:scale-95 rounded bg-[#007AFF] bg-gradient-to-b from-white/10 to-transparent px-2 py-0.5 text-sm text-white shadow-md"
            >
              Search
            </button>
          </form>
        </div>
        {/* Text content */}
        <div
          dangerouslySetInnerHTML={{
            __html: newContent ? newContent : file.content,
          }}
          className="flex-grow overflow-y-scroll rounded-b-md bg-white/95 p-2 px-4 text-black/90"
        />
        <div className="flex w-full bg-[#F5F5F5] px-4 py-1 text-zinc-600 gap-x-4 rounded-b-md border-gray-200/50 border-t">
          <p className="text-sm">
            Word count:
            <span className="text-sm font-medium text-zinc-800 ml-1">
              {countWords(file.content)}{" "}
            </span>
          </p>
          <p className="text-sm flex items-center">
            Total Matches:
            <span className="text-sm font-medium text-zinc-800 ml-1 block w-6">
              {occurrences}
            </span>
            <span className="font-light text-zinc-600 text-xs">
              (Occurrences)
            </span>
          </p>
        </div>
      </section>
      <section className="px-4 border border-[#969696]/40 shadow-md rounded-md py-2 overflow-y-scroll max-h-[calc(100vh - 100px)]">
        <h3 className="italic font-bold text-black/60">Search History</h3>
        {
          <ul className="divide-y py-2">
            {searHistory.map((search, index) => (
              <li className="text-zinc-500 py-1" key={index}>
                {search}
              </li>
            ))}
          </ul>
        }
      </section>
    </section>
  );
}
