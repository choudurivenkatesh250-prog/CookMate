import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/Layout";
import { RecipeCard } from "@/components/RecipeCard";
import { Chip } from "@/components/Chip";
import { RECIPES } from "@/data/recipes";
const LIMITS = [50, 100, 150];
const Route = createFileRoute("/budget")({
  head: () => ({
    meta: [
      { title: "Budget Meals Under \u20B9150 \u2014 CookMate" },
      {
        name: "description",
        content: "Affordable Indian meals under \u20B950, \u20B9100 and \u20B9150 that beginners can cook at home."
      },
      { property: "og:title", content: "Budget Meals Under \u20B9150 \u2014 CookMate" },
      { property: "og:description", content: "Cheap, filling meals with minimal ingredients." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ]
  }),
  component: Budget
});
function Budget() {
  const [limit, setLimit] = useState(100);
  const results = RECIPES.filter((r) => r.cost <= limit).sort((a, b) => a.cost - b.cost);
  return <Page>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Budget Meals</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Good food doesn't need a big grocery bill. Pick your limit.
        </p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {LIMITS.map((l) => <Chip key={l} active={limit === l} onClick={() => setLimit(l)}>
              Under ₹{l}
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
