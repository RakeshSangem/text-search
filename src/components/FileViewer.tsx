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
      `<mark class="bg-yellow-200">${searchValue}</mark>`
    );

    setNewContent(newContent);
  };

  return (
    <section className="fade-in flex max-w-screen-md w-full flex-grow flex-col rounded-md border border-[#969696]/40 shadow-md">
      <div className="flex items-center justify-between rounded-t-md bg-[#F5F5F5] p-1 px-4 text-gray-700">
        <button
          onClick={() => onClose && onClose(null)}
          className="grid h-4 w-4 place-items-center rounded-full bg-[#FF5F57]"
        >
          <svg
            className="text-black/45"
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
        <div className="">
          <Input
            type="search"
            onChange={onSearch}
            className="my-1 min-w-16 rounded-md border border-[#D1D1D1] bg-transparent px-2 py-1 ring-blue-500/50 focus:outline-none focus:ring-2"
            placeholder="Search... "
          />
        </div>
      </div>
      {/* Text content */}
      <div
        dangerouslySetInnerHTML={{
          __html: newContent ? newContent : file.content,
        }}
        className="flex-grow overflow-y-scroll rounded-b-md bg-white/95 p-2 px-4 text-black/90"
      />
      <div className="flex w-full bg-[#F5F5F5] px-4 py-1 text-zinc-600 gap-x-4">
        <p className="text-sm">
          Word count:
          <span className="text-sm font-medium text-zinc-800 ml-1">
            {countWords(file.content)}{" "}
          </span>
        </p>
        <p className="text-sm">
          Total Matches:
          <span className="text-sm font-medium text-zinc-800 ml-1">
            {occurrences}
          </span>
        </p>
      </div>
    </section>
  );
}
