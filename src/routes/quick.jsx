import { createFileRoute, Link } from "@tanstack/react-router";
import { useTransition, useState } from "react";
import { Timer } from "lucide-react";
import { Page } from "@/components/Layout";
import { Chip } from "@/components/Chip";
import { EmptyState } from "@/components/EmptyState";
import { RecipeGrid } from "@/components/RecipeGrid";
import { SectionHeading } from "@/components/SectionHeading";
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
  const [pending, startTransition] = useTransition();
  const results = RECIPES.filter((r) => r.cookingTime <= max).sort(
    (a, b) => a.cookingTime - b.cookingTime
  );
  const choose = (minutes) => startTransition(() => setMax(minutes));
  return <Page>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
    as="h1"
    eyebrow="Ready fast"
    title="Quick Meals"
    description="Hungry now? These are ready before delivery would even arrive."
    action={<Link
    to="/discover"
    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
  >
            Match my ingredients
          </Link>}
  />
        <div className="mt-7 flex flex-wrap gap-2.5">
          {TIMES.map((minutes) => <Chip
    key={minutes}
    active={max === minutes}
    onClick={() => choose(minutes)}
    count={RECIPES.filter((r) => r.cookingTime <= minutes).length}
  >
              {minutes} minutes
            </Chip>)}
        </div>
        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
          {results.length} {results.length === 1 ? "recipe" : "recipes"} ready in {max} minutes or
          less
        </p>
        <RecipeGrid
    className="mt-5"
    recipes={results}
    loading={pending}
    empty={<EmptyState
    icon={Timer}
    title={`Nothing under ${max} minutes yet`}
    description="Our quickest recipes need a little more time than that. Try a wider window."
  >
            {max < 20 ? <button
    type="button"
    onClick={() => choose(20)}
    className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition duration-300 hover:-translate-y-0.5"
  >
                Show 20-minute meals
              </button> : null}
            <Link
    to="/discover"
    className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
  >
              Browse all recipes
            </Link>
          </EmptyState>}
  />
      </div>
    </Page>;
}
export {
  Route
};
