function Chip({
  active = false,
  onClick,
  count,
  children
}) {
  return <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium outline-none transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-ring/30 active:translate-y-0 ${active ? "border-primary bg-primary text-primary-foreground shadow-soft" : "border-border bg-card text-foreground hover:border-primary hover:text-primary"}`}
  >
      {children}
      {typeof count === "number" ? <span className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold leading-none ${active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          {count}
        </span> : null}
    </button>;
}
export {
  Chip
};
