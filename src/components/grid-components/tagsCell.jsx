function TagsCell({ tags = [] }) {
  return (
    <div className="bg-none text-light border border-light/50 p-4 sm:p-6 flex flex-wrap sm:flex-col items-start content-start h-full gap-3 col-span-2 sm:col-span-1 rounded-2xl overflow-hidden">
      {tags.map((t) => (
        <div key={t} className="px-3 py-1 rounded-full border border-light/50 text-sm sm:text-base">
          {t}
        </div>
      ))}
    </div>
  );
}

export default TagsCell;
