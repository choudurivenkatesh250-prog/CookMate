import { Search } from "lucide-react";
function SearchBar({
  value,
  onChange,
  placeholder = "Search recipes\u2026"
}) {
  return <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
      <input
    type="search"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    aria-label="Search recipes"
    className="w-full rounded-full border border-border bg-card py-3.5 pl-12 pr-4 text-base text-foreground shadow-soft outline-none transition focus:border-primary focus:ring-4 focus:ring-ring/30"
  />
    </div>;
}
export {
  SearchBar
};
