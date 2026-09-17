import { Link } from "@tanstack/react-router";
import { Bookmark, Clock, IndianRupee, Users } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
const DIFFICULTY_STYLES = {
  Easy: "bg-accent text-accent-foreground",
  Medium: "bg-amber-100 text-amber-900"
};
function DietBadge({ vegetarian }) {
  return <span
    title={vegetarian ? "Vegetarian" : "Contains egg"}
    className="inline-flex items-center gap-1.5 rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-soft backdrop-blur"
  >
      <span className={`grid size-3.5 place-items-center rounded-[3px] border ${vegetarian ? "border-emerald-600" : "border-rose-600"}`}>
        <span className={`size-1.5 rounded-full ${vegetarian ? "bg-emerald-600" : "bg-rose-600"}`} />
      </span>
      {vegetarian ? "Veg" : "Egg"}
    </span>;
}
function RecipeCard({ recipe, index = 0 }) {
  const { isSaved, toggle } = useBookmarks();
  const saved = isSaved(recipe.id);
  const vegetarian = !recipe.categories.includes("Non-Vegetarian");
  return <article
    className="group relative flex h-full animate-fade-up flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift"
    style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
  >
      <Link
    to="/recipes/$recipeId"
    params={{ recipeId: recipe.id }}
    className="relative block overflow-hidden outline-none focus-visible:ring-4 focus-visible:ring-ring/30"
  >
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
    src={recipe.image}
    alt={recipe.title}
    loading={index < 3 ? "eager" : "lazy"}
    width={944}
    height={704}
    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
  />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          <DietBadge vegetarian={vegetarian} />
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-soft ${DIFFICULTY_STYLES[recipe.difficulty] ?? "bg-secondary text-secondary-foreground"}`}>
            {recipe.difficulty}
          </span>
        </div>
        <span className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-between opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-sm font-semibold text-white drop-shadow">View recipe</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-foreground">
            <Clock className="size-3.5" /> {recipe.cookingTime} min
          </span>
        </span>
      </Link>

      <button
    type="button"
    aria-label={saved ? `Remove ${recipe.title} from saved` : `Save ${recipe.title}`}
    aria-pressed={saved}
    onClick={() => toggle(recipe.id)}
    className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur transition duration-300 hover:scale-110 hover:text-primary active:scale-95"
  >
        <Bookmark className={`size-5 transition-transform duration-300 ${saved ? "scale-110 fill-primary text-primary" : ""}`} />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
          {recipe.categories[0]}
        </span>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-foreground">
          <Link
    to="/recipes/$recipeId"
    params={{ recipeId: recipe.id }}
    className="outline-none transition-colors duration-300 group-hover:text-primary"
  >
            {recipe.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {recipe.description}
        </p>
        <div className="mt-auto flex items-center gap-4 border-t border-border pt-4 text-sm font-medium text-foreground">
          <span title="Cooking time" className="inline-flex items-center gap-1.5">
            <Clock className="size-4 text-primary" /> {recipe.cookingTime} min
          </span>
          <span title="Approximate cost" className="inline-flex items-center gap-0.5">
            <IndianRupee className="size-4 text-primary" />
            {recipe.cost}
          </span>
          <span title="Serves" className="ml-auto inline-flex items-center gap-1.5 text-muted-foreground">
            <Users className="size-4" /> {recipe.servings}
          </span>
        </div>
      </div>
    </article>;
}
export {
  RecipeCard
};
