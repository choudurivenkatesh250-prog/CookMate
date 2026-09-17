import { Link } from "@tanstack/react-router";
import { ChefHat, Menu, X } from "lucide-react";
import { useState } from "react";
const NAV = [
  { to: "/", label: "Home" },
  { to: "/discover", label: "Discover" },
  { to: "/budget", label: "Budget Meals" },
  { to: "/quick", label: "Quick Meals" },
  { to: "/saved", label: "Saved" }
];
function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <span className="grid size-9 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <ChefHat className="size-5" />
          </span>
          CookMate
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => <Link
    key={item.to}
    to={item.to}
    activeOptions={{ exact: item.to === "/" }}
    activeProps={{ className: "bg-accent text-accent-foreground" }}
    className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
  >
              {item.label}
            </Link>)}
        </div>

        <button
    type="button"
    onClick={() => setOpen((v) => !v)}
    aria-label="Toggle menu"
    className="grid size-10 place-items-center rounded-full border border-border text-foreground md:hidden"
  >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          {NAV.map((item) => <Link
    key={item.to}
    to={item.to}
    onClick={() => setOpen(false)}
    activeOptions={{ exact: item.to === "/" }}
    activeProps={{ className: "text-primary" }}
    className="block rounded-xl px-2 py-3 text-base font-medium text-foreground"
  >
              {item.label}
            </Link>)}
        </div>}
    </header>;
}
function Footer() {
  return <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <ChefHat className="size-5 text-primary" /> CookMate
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Simple cooking for students, bachelors and anyone living away from home.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/discover" className="hover:text-primary">Find by ingredients</Link></li>
            <li><Link to="/budget" className="hover:text-primary">Budget meals</Link></li>
            <li><Link to="/quick" className="hover:text-primary">Quick meals</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Good to know</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Every recipe uses minimal ingredients, basic utensils and beginner-friendly steps.
          </p>
        </div>
      </div>
      <p className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {(/* @__PURE__ */ new Date()).getFullYear()} CookMate. Cook something good today.
      </p>
    </footer>;
}
function Page({ children }) {
  return <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>;
}
export {
  Footer,
  Navbar,
  Page
};
