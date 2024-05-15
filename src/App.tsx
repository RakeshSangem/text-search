function App() {
  return (
    <div className="min-h-screen px-4">
      <div className="flex min-h-screen flex-col items-center py-10">
        <h1 className="mb-4 text-4xl font-normal tracking-normal">
          Text Search
        </h1>
        <input
          type="file"
          className="mb-4 rounded border border-gray-300 p-2"
        />
        {/* Text Viewer */}
        <section className="flex max-w-screen-lg flex-grow flex-col rounded-md border border-[#969696]/40 shadow-md">
          <div className="flex items-center justify-between rounded-t-md bg-[#F5F5F5] p-1 px-4 text-gray-700">
            <div className="grid h-4 w-4 place-items-center rounded-full bg-[#FF5F57]">
              <svg width="1rem" height="1rem" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M6.793 6.793a1 1 0 0 1 1.414 0L12 10.586l3.793-3.793a1 1 0 1 1 1.414 1.414L13.414 12l3.793 3.793a1 1 0 0 1-1.414 1.414L12 13.414l-3.793 3.793a1 1 0 0 1-1.414-1.414L10.586 12L6.793 8.207a1 1 0 0 1 0-1.414"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h2 className="">Sample.txt</h2>
            <div className="">
              <input
                type="search"
                className="my-1 min-w-16 rounded-md border border-[#D1D1D1] bg-transparent px-2 py-1 ring-blue-500/50 focus:outline-none focus:ring-2"
                placeholder="Search... "
              />
            </div>
          </div>
          {/* Text content */}
          <div className="flex-grow overflow-y-scroll rounded-b-md bg-white/95 p-2 px-4 text-black/90">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
            cupiditate exercitationem illo adipisci nobis alias tempore, autem
            possimus praesentium distinctio non? Eius sit laborum pariatur
            explicabo voluptates magnam ducimus possimus. Fuga molestiae maiores
            sint veniam sequi pariatur, ab, quae reprehenderit autem culpa
            voluptatem laudantium quibusdam nemo quaerat. Delectus explicabo
            animi necessitatibus eligendi dolorem, quisquam esse. corrupti
            ducimus quisquam. Molestias adipisci commodi laborum rem minus, nam
            praesentium animi quaerat sunt placeat corrupti cupiditate nesciunt
            suscipit aperiam atque velit magnam! Temporibus perspiciatis quidem
            consequatur doloribus asperiores omnis minus necessitatibus
            delectus? Nisi omnis culpa ea est possimus nobis excepturi, eius
            harum neque ratione quaerat distinctio sit fugiat repellendus quia?
            Vel similique quisquam commodi nemo voluptatum cupiditate excepturi
            placeat. Aliquid, assumenda vero. Iure voluptatibus facere in nam
            magnam eveniet quod earum eaque nisi laboriosam dolore est ad,
            doloremque amet voluptates quisquam repellendus animi quibusdam
            dicta ea laborum. Sunt laborum nostrum mollitia illum. Dolore
            itaque, numquam alias asperiores nobis error dolores, doloremque
            facere nemo a fugiat fugit voluptas maxime! Nobis fugit obcaecati
            quos consequatur id ex facere praesentium, maiores, minus aliquid
            omnis distinctio. Maiores ipsum repellat impedit eligendi nobis,
            sequi corporis facilis praesentium sint itaque in culpa, vero
            recusandae velit fuga eius assumenda tempora omnis cumque
            accusantium minima voluptate soluta. Laborum, inventore perferendis.
            Esse temporibus sunt dolorem laudantium voluptatem mollitia
            voluptatum perferendis saepe, distinctio debitis qui nobis
            reiciendis, nostrum nulla dolore rem repellat commodi ab? Accusamus
            error sapiente ipsum numquam ab nam distinctio perferendis fuga
            voluptas voluptate est quia ut deleniti dolores blanditiis corporis
            quaerat quibusdam, veniam, voluptatem tenetur earum exercitationem
            quis. Omnis, reiciendis quaerat.
          </div>
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
      </div>
    </div>
  );
}
export default App;
