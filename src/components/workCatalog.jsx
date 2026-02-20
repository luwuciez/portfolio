function WorkCatalog({ projects }) {
  return (
    <div className="max-w-3xl xl:max-w-300 mx-auto flex flex-col gap-15 pt-20 pb-30 px-6">
      {projects.map((project) => project)}
    </div>
  );
}

export default WorkCatalog;
