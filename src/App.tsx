import { ChangeEvent, useState } from "react";
import Input from "./components/Input";
import FileViewer from "./components/FileViewer";
export interface File {
  name: string;
  content: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);

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
      <div className="flex min-h-screen flex-col items-center py-10 fade-in">
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
          <FileViewer file={file} onClose={setFile} />
        )}
      </div>
    </main>
  );
}
export default App;
