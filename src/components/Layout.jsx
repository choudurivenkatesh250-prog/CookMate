import { Link, useRouterState } from "@tanstack/react-router";
import { Bookmark, ChefHat, Menu, Search, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useBookmarks } from "@/hooks/useBookmarks";
const NAV = [
  { to: "/", label: "Home" },
  { to: "/discover", label: "Discover" },
  { to: "/budget", label: "Budget Meals" },
  { to: "/quick", label: "Quick Meals" },
  { to: "/saved", label: "Saved" }
];
const FOOTER_CATEGORIES = ["Breakfast", "Lunch", "Dinner", "South Indian"];
function isActivePath(to, pathname) {
  return to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
}
function NavLink({ item, badge, pathname }) {
  const active = isActivePath(item.to, pathname);
  return <Link
    to={item.to}
    aria-current={active ? "page" : undefined}
    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
  >
      {item.label}
      {badge > 0 ? <span className="rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-bold leading-none text-primary-foreground">
          {badge}
        </span> : null}
    </Link>;
}
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { ids } = useBookmarks();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigating away always closes the mobile drawer.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-border bg-background/85 shadow-soft backdrop-blur-xl" : "border-transparent bg-background/60 backdrop-blur-md"}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" aria-label="CookMate home" className="group flex items-center gap-2.5 rounded-2xl outline-none">
          <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
            <ChefHat className="size-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-bold text-foreground">CookMate</span>
            <span className="mt-0.5 hidden text-[11px] font-medium text-muted-foreground sm:block">
              Cook with what you have
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => <NavLink
    key={item.to}
    item={item}
    pathname={pathname}
    badge={item.to === "/saved" ? ids.length : 0}
  />)}
        </div>

        <div className="flex items-center gap-2">
          <Link
    to="/discover"
    className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90 sm:inline-flex"
  >
            <Search className="size-4" /> Find recipes
          </Link>
          <button
    type="button"
    onClick={() => setOpen((value) => !value)}
    aria-expanded={open}
    aria-controls="mobile-menu"
    aria-label={open ? "Close menu" : "Open menu"}
    className="grid size-10 place-items-center rounded-2xl border border-border bg-card text-foreground transition duration-300 hover:border-primary hover:text-primary md:hidden"
  >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? <div id="mobile-menu" className="animate-fade-in border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {NAV.map((item) => <Link
    key={item.to}
    to={item.to}
    aria-current={isActivePath(item.to, pathname) ? "page" : undefined}
    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors ${isActivePath(item.to, pathname) ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted"}`}
  >
                {item.label}
                {item.to === "/saved" && ids.length > 0 ? <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                    {ids.length}
                  </span> : null}
              </Link>)}
            <Link
    to="/discover"
    className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-base font-semibold text-primary-foreground"
  >
              <Search className="size-4" /> Find recipes
            </Link>
          </div>
        </div> : null}
    </header>;
}
function Footer() {
  return <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <span className="grid size-9 place-items-center rounded-2xl bg-primary text-primary-foreground">
                <ChefHat className="size-5" />
              </span>
              CookMate
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Simple cooking for students, bachelors and anyone living away from home. Every recipe
              uses everyday ingredients and beginner-friendly steps.
            </p>
            <Link
    to="/discover"
    className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
  >
              <Sparkles className="size-4 text-primary" /> Find something to cook
            </Link>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/discover" className="transition-colors hover:text-primary">Find by ingredients</Link></li>
              <li><Link to="/quick" className="transition-colors hover:text-primary">Quick meals</Link></li>
              <li><Link to="/budget" className="transition-colors hover:text-primary">Budget meals</Link></li>
              <li><Link to="/saved" className="transition-colors hover:text-primary">Saved recipes</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Categories</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {FOOTER_CATEGORIES.map((category) => <li key={category}>
                  <Link to="/discover" search={{ category }} className="transition-colors hover:text-primary">
                    {category}
                  </Link>
                </li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} CookMate. Cook something good today.</p>
          <p className="inline-flex items-center gap-1.5">
            <Bookmark className="size-3.5" /> Saved in your browser or a local SQLite file.
          </p>
        </div>
      </div>
    </footer>;
}
function Page({ children }) {
  return <div className="flex min-h-screen flex-col bg-background">
      <a
    href="#main"
    className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground"
  >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
    </div>;
}
export {
  Page
};
