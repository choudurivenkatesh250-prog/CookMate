import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { Page } from "@/components/Layout";
import { EmptyState } from "@/components/EmptyState";
import { RecipeGrid } from "@/components/RecipeGrid";
import { SectionHeading } from "@/components/SectionHeading";
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
  const { ids, loading } = useBookmarks();
  const saved = RECIPES.filter((r) => ids.includes(r.id));
  const totalCost = saved.reduce((sum, recipe) => sum + recipe.cost, 0);
  return <Page>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
    as="h1"
    eyebrow="Your cookbook"
    title="Saved Recipes"
    description="Everything you bookmarked, ready when you are."
  />

        {!loading && saved.length > 0 ? <p className="mt-6 text-sm text-muted-foreground">
            {saved.length} saved {saved.length === 1 ? "recipe" : "recipes"} · roughly ₹{totalCost} to
            cook them all
          </p> : null}

        <RecipeGrid
    className="mt-6"
    recipes={saved}
    loading={loading}
    skeletonCount={3}
    empty={<EmptyState
    icon={Bookmark}
    title="No saved recipes yet"
    description="Tap the bookmark icon on any recipe and it will be waiting for you here."
  >
            <Link
    to="/discover"
    className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition duration-300 hover:-translate-y-0.5"
  >
              Browse recipes
            </Link>
            <Link
    to="/quick"
    className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
  >
              Quick meals
            </Link>
          </EmptyState>}
  />
      </div>
    </Page>;
}
export {
  Route
};
