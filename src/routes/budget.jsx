import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { Wallet } from "lucide-react";
import { Page } from "@/components/Layout";
import { Chip } from "@/components/Chip";
import { EmptyState } from "@/components/EmptyState";
import { RecipeGrid } from "@/components/RecipeGrid";
import { SectionHeading } from "@/components/SectionHeading";
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
  const [pending, startTransition] = useTransition();
  const results = RECIPES.filter((r) => r.cost <= limit).sort((a, b) => a.cost - b.cost);
  const choose = (amount) => startTransition(() => setLimit(amount));
  return <Page>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
    as="h1"
    eyebrow="Easy on the wallet"
    title="Budget Meals"
    description="Good food doesn't need a big grocery bill. Pick your limit and see what fits."
    action={<span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
            <Wallet className="size-4" /> Cheap eats, real meals
          </span>}
  />
        <div className="mt-7 flex flex-wrap gap-2.5">
          {LIMITS.map((amount) => <Chip
    key={amount}
    active={limit === amount}
    onClick={() => choose(amount)}
    count={RECIPES.filter((r) => r.cost <= amount).length}
  >
              Under ₹{amount}
            </Chip>)}
        </div>
        <p className="mt-8 text-sm text-muted-foreground" aria-live="polite">
          {results.length} {results.length === 1 ? "recipe" : "recipes"} for ₹{limit} or less
        </p>
        <RecipeGrid
    className="mt-5"
    recipes={results}
    loading={pending}
    empty={<EmptyState
    icon={Wallet}
    title={`Nothing under ₹${limit} yet`}
    description="These meals need a slightly bigger budget. Try a higher limit."
  >
            {limit < 150 ? <button
    type="button"
    onClick={() => choose(Math.min(limit + 50, 150))}
    className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition duration-300 hover:-translate-y-0.5"
  >
                Raise the limit to ₹{Math.min(limit + 50, 150)}
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
