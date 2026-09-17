import { UtensilsCrossed } from "lucide-react";
function EmptyState({
  icon: Icon = UtensilsCrossed,
  title,
  description,
  children
}) {
  return <div className="animate-fade-up rounded-[2rem] border border-dashed border-border bg-card/60 px-6 py-14 text-center">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
        <Icon className="size-6" />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-foreground">{title}</h3>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {description}
        </p> : null}
      {children ? <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {children}
        </div> : null}
    </div>;
}
export {
  EmptyState
};