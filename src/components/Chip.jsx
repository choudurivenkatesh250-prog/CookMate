function Chip({
  active,
  onClick,
  children
}) {
  return <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${active ? "border-primary bg-primary text-primary-foreground shadow-soft" : "border-border bg-card text-foreground hover:border-primary hover:text-primary"}`}
  >
      {children}
    </button>;
}
export {
  Chip
};
