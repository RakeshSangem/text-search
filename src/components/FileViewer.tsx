import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Input from "./Input";
import { countWords } from "../helpers/utilities";
import { File } from "../App";

interface FileViewerProps {
  file: File;
  onClose?: Dispatch<SetStateAction<File | null>>;
}

export default function FileViewer({ file, onClose }: FileViewerProps) {
  const [newContent, setNewContent] = useState<string>("");
  const [occurrences, setOccurrences] = useState<number>(0);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (!file) return;

    const regex = new RegExp(searchValue, "gi");

    const matches = file.content.match(regex);

    const count = searchValue ? (matches ? matches.length : 0) : 0;
    setOccurrences(count);

    const newContent = file.content.replace(
      regex,
      `<mark class="bg-yellow-300 rounded-md">${searchValue}</mark>`
    );

    setNewContent(newContent);
  };

  return (
    <section className="fade-in flex max-w-screen-md w-full flex-grow flex-col rounded-md border border-[#969696]/40 shadow-md">
      <div className="flex items-center justify-between rounded-t-md bg-[#F5F5F5] p-1 px-4 text-gray-700">
        <button
          onClick={() => onClose && onClose(null)}
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
        <h2 className="">{file.name}</h2>
        <div className="flex items-center space-x-1 relative">
          <div className="relative">
            <Input
              type="search"
              onChange={onSearch}
              className="reltive min-w-16 rounded-md border border-[#D3D3D3] bg-transparent px-2 py-0.5 text-sm ring-blue-500/20 focus:outline-none focus:ring-2"
              placeholder="Search... "
            />
            <div className="absolute text-xs p-0.5 rounded-md right-0.5 top-0.5 text-slate-400 border border-gray-300 bg-[#F5F5F5]">
              ⌘K
            </div>
          </div>
          <button className="active:from-transparent-black rounded bg-[#007AFF] bg-gradient-to-b from-white/10 to-transparent px-2 py-0.5 text-sm text-white shadow-md">
            Search
          </button>
        </div>
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
  );
}
