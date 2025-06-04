const Description = ({ description }: { description: string }) => {
  return (
    <article className="mt-4">
      <p className="text-muted-foreground font-light leading-loose text-justify">
        {description}
      </p>
    </article>
  );
};
export default Description;
