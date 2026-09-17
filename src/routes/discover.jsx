import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Page } from "@/components/Layout";
import { RecipeCard } from "@/components/RecipeCard";
import { SearchBar } from "@/components/SearchBar";
import { Chip } from "@/components/Chip";
import { CATEGORIES, COMMON_INGREDIENTS, RECIPES } from "@/data/recipes";
const Route = createFileRoute("/discover")({
  validateSearch: (search) => ({
    category: typeof search["category"] === "string" ? search["category"] : void 0
  }),
  head: () => ({
    meta: [
      { title: "Find Recipes by Ingredients \u2014 CookMate" },
      {
        name: "description",
        content: "Select the ingredients you already have and instantly see easy recipes with cooking time, difficulty and estimated cost."
      },
      { property: "og:title", content: "Find Recipes by Ingredients \u2014 CookMate" },
      {
        property: "og:description",
        content: "Pick what's in your kitchen and get matching beginner-friendly recipes."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ]
  }),
  component: Discover
});
function Discover() {
  const { category: initialCategory } = Route.useSearch();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [category, setCategory] = useState(initialCategory);
  const [difficulty, setDifficulty] = useState();
  const toggleIngredient = (i) => setSelected((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  const results = RECIPES.filter((r) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.ingredients.some((i) => i.toLowerCase().includes(q));
    const matchesIngredients = selected.length === 0 || selected.some((i) => r.ingredients.includes(i));
    const matchesCategory = !category || r.categories.includes(category);
    const matchesDifficulty = !difficulty || r.difficulty === difficulty;
    return matchesQuery && matchesIngredients && matchesCategory && matchesDifficulty;
  }).sort(
    (a, b) => b.ingredients.filter((i) => selected.includes(i)).length - a.ingredients.filter((i) => selected.includes(i)).length
  );
  return <Page>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          What's in your kitchen?
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Tap the ingredients you already have and we'll show what you can cook tonight.
        </p>

        <div className="mt-6 max-w-xl">
          <SearchBar value={query} onChange={setQuery} placeholder="Search recipes or ingredients…" />
        </div>

        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Ingredients
          </h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {COMMON_INGREDIENTS.map((i) => <Chip key={i} active={selected.includes(i)} onClick={() => toggleIngredient(i)}>
                {i}
              </Chip>)}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Category
          </h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <Chip active={!category} onClick={() => setCategory(void 0)}>
              All
            </Chip>
            {CATEGORIES.map((c) => <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </Chip>)}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Difficulty
          </h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <Chip active={!difficulty} onClick={() => setDifficulty(void 0)}>
              Any
            </Chip>
            <Chip active={difficulty === "Easy"} onClick={() => setDifficulty("Easy")}>
              Easy
            </Chip>
            <Chip active={difficulty === "Medium"} onClick={() => setDifficulty("Medium")}>
              Medium
            </Chip>
          </div>
        </section>

        <section className="mt-10">
          <p className="text-sm text-muted-foreground">{results.length} recipes match</p>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r) => <RecipeCard key={r.id} recipe={r} />)}
          </div>
          {results.length === 0 && <p className="rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No matches yet — try removing a filter or picking another ingredient.
            </p>}
        </section>
      </div>
    </Page>;
}
export {
  Route
};
