function PageTitle({ title, id }) {
  return (
    <h1 id={id} className="font-dela text-3xl lg:text-4xl text-light text-center my-8 mx-6">
      {title}
    </h1>
  );
}

export default PageTitle;
