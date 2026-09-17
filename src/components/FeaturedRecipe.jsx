import { Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, Clock, IndianRupee, Users } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
function FeaturedRecipe({ recipe }) {
  const { isSaved, toggle } = useBookmarks();
  const saved = isSaved(recipe.id);
  const vegetarian = !recipe.categories.includes("Non-Vegetarian");
  return <article className="group grid animate-fade-up overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift lg:grid-cols-[1.1fr_1fr]">
      <div className="relative overflow-hidden">
        <img
    src={recipe.image}
    alt={recipe.title}
    width={944}
    height={704}
    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 lg:min-h-[22rem]"
  />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/5 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-card/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary shadow-soft backdrop-blur">
            Featured
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card/95 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-soft backdrop-blur">
            <span className={`grid size-3.5 place-items-center rounded-[3px] border ${vegetarian ? "border-emerald-600" : "border-rose-600"}`}>
              <span className={`size-1.5 rounded-full ${vegetarian ? "bg-emerald-600" : "bg-rose-600"}`} />
            </span>
            {vegetarian ? "Veg" : "Egg"}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center p-6 sm:p-8">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
          {recipe.categories.slice(0, 2).join(" · ")}
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          <Link to="/recipes/$recipeId" params={{ recipeId: recipe.id }} className="outline-none transition-colors duration-300 group-hover:text-primary">
            {recipe.title}
          </Link>
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{recipe.description}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl bg-muted/70 px-3 py-2.5">
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5" /> Time
            </dt>
            <dd className="mt-0.5 font-semibold text-foreground">{recipe.cookingTime} min</dd>
          </div>
          <div className="rounded-2xl bg-muted/70 px-3 py-2.5">
            <dt className="flex items-center gap-1 text-xs text-muted-foreground">
              <IndianRupee className="size-3.5" /> Cost
            </dt>
            <dd className="mt-0.5 font-semibold text-foreground">{recipe.cost}</dd>
          </div>
          <div className="rounded-2xl bg-muted/70 px-3 py-2.5">
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="size-3.5" /> Serves
            </dt>
            <dd className="mt-0.5 font-semibold text-foreground">{recipe.servings}</dd>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-2">
          {recipe.ingredients.map((ingredient) => <li key={ingredient} className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
              {ingredient}
            </li>)}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
    to="/recipes/$recipeId"
    params={{ recipeId: recipe.id }}
    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
  >
            Start cooking <ArrowRight className="size-4" />
          </Link>
          <button
    type="button"
    onClick={() => toggle(recipe.id)}
    aria-pressed={saved}
    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
  >
            <Bookmark className={`size-4 ${saved ? "fill-primary text-primary" : ""}`} />
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </article>;
}
export {
  FeaturedRecipe
};