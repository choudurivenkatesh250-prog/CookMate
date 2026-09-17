import { Link } from "@tanstack/react-router";
import { Bookmark, Clock, IndianRupee } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
function RecipeCard({ recipe }) {
  const { isSaved, toggle } = useBookmarks();
  const saved = isSaved(recipe.id);
  return <article className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link to="/recipes/$recipeId" params={{ recipeId: recipe.id }} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
    src={recipe.image}
    alt={recipe.title}
    loading="lazy"
    width={944}
    height={704}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
  />
        </div>
        <div className="space-y-2 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
              {recipe.difficulty}
            </span>
            <span className="text-xs text-muted-foreground">{recipe.categories[0]}</span>
          </div>
          <h3 className="text-lg font-semibold leading-tight text-foreground">{recipe.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{recipe.description}</p>
          <div className="flex items-center gap-4 pt-1 text-sm font-medium text-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4 text-primary" /> {recipe.cookingTime} min
            </span>
            <span className="inline-flex items-center gap-0.5">
              <IndianRupee className="size-4 text-primary" /> {recipe.cost}
            </span>
          </div>
        </div>
      </Link>
      <button
    type="button"
    aria-label={saved ? `Remove ${recipe.title} from saved` : `Save ${recipe.title}`}
    onClick={() => toggle(recipe.id)}
    className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-card/90 text-foreground backdrop-blur transition hover:scale-110 hover:text-primary"
  >
        <Bookmark className={`size-5 ${saved ? "fill-primary text-primary" : ""}`} />
      </button>
    </article>;
}
export {
  RecipeCard
};
