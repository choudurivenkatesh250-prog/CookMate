import { RecipeCard } from "@/components/RecipeCard";
import { RecipeCardSkeleton } from "@/components/Skeleton";
function RecipeGrid({
  recipes,
  loading = false,
  skeletonCount = 6,
  empty,
  className = ""
}) {
  const grid = `grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`;
  if (loading) {
    return <div className={grid} aria-busy="true" role="status">
        <span className="sr-only">Loading recipes…</span>
        {Array.from({ length: skeletonCount }).map((_, i) => <RecipeCardSkeleton key={i} />)}
      </div>;
  }
  if (recipes.length === 0) {
    return empty ?? <p className="rounded-[2rem] border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
        No recipes to show yet.
      </p>;
  }
  return <div className={grid} aria-live="polite" role="status">
      <span className="sr-only">{recipes.length} recipes</span>
      {recipes.map((recipe, index) => <RecipeCard key={recipe.id} recipe={recipe} index={index} />)}
    </div>;
}
export {
  RecipeGrid
};