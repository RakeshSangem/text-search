import { ChangeEvent, useState } from "react";
import Input from "./components/Input";

interface File {
  name: string;
  content: string;
}

function App() {
  const [file, setFile] = useState<File | null>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target?.result as string;

      setFile({
        name: selectedFile.name,
        content: fileContent,
      });
    };
    reader.readAsText(selectedFile);
  };

  return (
    <main className="min-h-screen px-4">
      <div className="flex min-h-screen flex-col items-center py-10">
        <h1 className="mb-4 text-4xl font-normal tracking-normal">
          Text Search
        </h1>
        {!file ? (
          <Input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="mb-4 rounded border border-gray-300 p-2"
          />
        ) : (
          <section className="fade-in flex max-w-screen-md w-full flex-grow flex-col rounded-md border border-[#969696]/40 shadow-md">
            <div className="flex items-center justify-between rounded-t-md bg-[#F5F5F5] p-1 px-4 text-gray-700">
              <div className="grid h-4 w-4 place-items-center rounded-full bg-[#FF5F57]">
                <svg width="1rem" height="1rem" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M6.793 6.793a1 1 0 0 1 1.414 0L12 10.586l3.793-3.793a1 1 0 1 1 1.414 1.414L13.414 12l3.793 3.793a1 1 0 0 1-1.414 1.414L12 13.414l-3.793 3.793a1 1 0 0 1-1.414-1.414L10.586 12L6.793 8.207a1 1 0 0 1 0-1.414"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="">{file.name}</h2>
              <div className="">
                <Input
                  type="search"
                  className="my-1 min-w-16 rounded-md border border-[#D1D1D1] bg-transparent px-2 py-1 ring-blue-500/50 focus:outline-none focus:ring-2"
                  placeholder="Search... "
                />
              </div>
            </div>
            {/* Text content */}
            <div
              dangerouslySetInnerHTML={{ __html: file.content || "" }}
              className="flex-grow overflow-y-scroll rounded-b-md bg-white/95 p-2 px-4 text-black/90"
            />
            <div className="flex w-full bg-[#F5F5F5] px-4 py-1 text-zinc-600 gap-x-4">
              <p className="text-sm">
                Total Matches:
                <span className="text-sm font-medium text-zinc-800"> 45 </span>
              </p>
              <p className="text-sm">
                Word count:
                <span className="text-sm font-medium text-zinc-800"> 45 </span>
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
export default App;
