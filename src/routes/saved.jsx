import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/Layout";
import { RecipeCard } from "@/components/RecipeCard";
import { RECIPES } from "@/data/recipes";
import { useBookmarks } from "@/hooks/useBookmarks";
const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Recipes \u2014 CookMate" },
      {
        name: "description",
        content: "Your bookmarked CookMate recipes, kept in one place for your next cooking session."
      },
      { property: "og:title", content: "Saved Recipes \u2014 CookMate" },
      { property: "og:description", content: "All the recipes you bookmarked on CookMate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ]
  }),
  component: Saved
});
function Saved() {
  const { ids } = useBookmarks();
  const saved = RECIPES.filter((r) => ids.includes(r.id));
  return <Page>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Saved Recipes</h1>
        <p className="mt-2 text-muted-foreground">Everything you bookmarked, ready when you are.</p>

        {saved.length > 0 ? <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div> : <div className="mt-10 rounded-3xl border border-dashed border-border p-12 text-center">
            <p className="text-lg font-semibold text-foreground">No saved recipes yet</p>
            <p className="mt-1 text-muted-foreground">
              Tap the bookmark icon on any recipe to keep it here.
            </p>
            <Link
    to="/discover"
    className="mt-6 inline-flex rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
  >
              Browse recipes
            </Link>
          </div>}
      </div>
    </Page>;
}
export {
  Route
};
