function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  as: Heading = "h2"
}) {
  const centered = align === "center";
  return <div className={centered ? "mx-auto max-w-2xl text-center" : "flex flex-wrap items-end justify-between gap-x-8 gap-y-4"}>
      <div className={centered ? "" : "max-w-2xl"}>
        {eyebrow ? <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent-foreground">
            {eyebrow}
          </span> : null}
        <Heading className="mt-3 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-[2rem]">
          {title}
        </Heading>
        {description ? <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {description}
          </p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>;
}
export {
  SectionHeading
};