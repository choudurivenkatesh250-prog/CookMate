import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/Layout";
import { RecipeCard } from "@/components/RecipeCard";
import { Chip } from "@/components/Chip";
import { RECIPES } from "@/data/recipes";
const TIMES = [10, 15, 20];
const Route = createFileRoute("/quick")({
  head: () => ({
    meta: [
      { title: "Quick Meals in 10, 15 or 20 Minutes \u2014 CookMate" },
      {
        name: "description",
        content: "Fast beginner recipes you can cook in 10, 15 or 20 minutes with everyday ingredients."
      },
      { property: "og:title", content: "Quick Meals in 10, 15 or 20 Minutes \u2014 CookMate" },
      { property: "og:description", content: "Hot, homemade food faster than delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ]
  }),
  component: Quick
});
function Quick() {
  const [max, setMax] = useState(15);
  const results = RECIPES.filter((r) => r.cookingTime <= max).sort(
    (a, b) => a.cookingTime - b.cookingTime
  );
  return <Page>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Quick Meals</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Hungry now? These are ready before delivery would even arrive.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {TIMES.map((t) => <Chip key={t} active={max === t} onClick={() => setMax(t)}>
              {t} minutes
            </Chip>)}
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      </div>
    </Page>;
}
export {
  Route
};
