import { Search, X } from "lucide-react";
function SearchBar({
  value,
  onChange,
  placeholder = "Search recipes\u2026",
  className = ""
}) {
  return <div className={`group relative ${className}`}>
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <input
    type="search"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    aria-label="Search recipes"
    className="w-full rounded-full border border-border bg-card py-3.5 pl-12 pr-12 text-base text-foreground shadow-soft outline-none transition duration-300 focus:border-primary focus:shadow-lift focus:ring-4 focus:ring-ring/25"
  />
      {value ? <button
    type="button"
    onClick={() => onChange("")}
    aria-label="Clear search"
    className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
  >
          <X className="size-4" />
        </button> : null}
    </div>;
}
export {
  SearchBar
};
