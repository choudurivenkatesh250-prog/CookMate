import { createFileRoute, Link } from "@tanstack/react-router";
import { useDeferredValue, useMemo, useState } from "react";
import { SearchX, SlidersHorizontal } from "lucide-react";
import { Page } from "@/components/Layout";
import { Chip } from "@/components/Chip";
import { EmptyState } from "@/components/EmptyState";
import { RecipeGrid } from "@/components/RecipeGrid";
import { SearchBar } from "@/components/SearchBar";
import { SectionHeading } from "@/components/SectionHeading";
import { CATEGORIES, COMMON_INGREDIENTS, RECIPES } from "@/data/recipes";
const SORTS = [
  { key: "match", label: "Best match" },
  { key: "time", label: "Quickest" },
  { key: "cost", label: "Cheapest" }
];
function sharedCount(recipe, ingredients) {
  return recipe.ingredients.filter((ingredient) => ingredients.includes(ingredient)).length;
}
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
  const [sort, setSort] = useState("match");

  // Typing stays instant: the list waits for a short pause while we show
  // skeleton cards, then settles on the new results.
  const deferredQuery = useDeferredValue(query);
  const searching = query !== deferredQuery;

  const toggleIngredient = (ingredient) => setSelected((prev) => prev.includes(ingredient) ? prev.filter((x) => x !== ingredient) : [...prev, ingredient]);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const matched = RECIPES.filter((recipe) => {
      const matchesQuery = !q || recipe.title.toLowerCase().includes(q) || recipe.description.toLowerCase().includes(q) || recipe.ingredients.some((i) => i.toLowerCase().includes(q));
      const matchesIngredients = selected.length === 0 || selected.some((i) => recipe.ingredients.includes(i));
      const matchesCategory = !category || recipe.categories.includes(category);
      const matchesDifficulty = !difficulty || recipe.difficulty === difficulty;
      return matchesQuery && matchesIngredients && matchesCategory && matchesDifficulty;
    });
    if (sort === "time") return matched.sort((a, b) => a.cookingTime - b.cookingTime);
    if (sort === "cost") return matched.sort((a, b) => a.cost - b.cost);
    return matched.sort(
      (a, b) => sharedCount(b, selected) - sharedCount(a, selected) || a.cookingTime - b.cookingTime
    );
  }, [deferredQuery, selected, category, difficulty, sort]);

  const activeFilters = selected.length + (category ? 1 : 0) + (difficulty ? 1 : 0) + (query.trim() ? 1 : 0);
  const clearAll = () => {
    setQuery("");
    setSelected([]);
    setCategory(void 0);
    setDifficulty(void 0);
    setSort("match");
  };
  return <Page>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <SectionHeading
    as="h1"
    eyebrow="Find your next meal"
    title="What's in your kitchen?"
    description="Tap the ingredients you already have and we'll show what you can cook tonight."
  />

        <div className="mt-7 md:sticky md:top-[4.5rem] md:z-30 md:rounded-3xl md:border md:border-border md:bg-background/85 md:p-4 md:shadow-soft md:backdrop-blur-xl">
          <SearchBar value={query} onChange={setQuery} placeholder="Search recipes or ingredients…" />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              <SlidersHorizontal className="size-3.5" /> Sort
            </span>
            {SORTS.map((option) => <Chip key={option.key} active={sort === option.key} onClick={() => setSort(option.key)}>
                {option.label}
              </Chip>)}
            {activeFilters > 0 ? <button
    type="button"
    onClick={clearAll}
    className="ml-auto rounded-full px-3 py-2 text-sm font-semibold text-primary transition hover:underline"
  >
                Clear all ({activeFilters})
              </button> : null}
          </div>
        </div>

        <section className="mt-9">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Ingredients
          </h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {COMMON_INGREDIENTS.map((ingredient) => <Chip
    key={ingredient}
    active={selected.includes(ingredient)}
    onClick={() => toggleIngredient(ingredient)}
    count={RECIPES.filter((r) => r.ingredients.includes(ingredient)).length}
  >
                {ingredient}
              </Chip>)}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Category
          </h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <Chip active={!category} onClick={() => setCategory(void 0)}>
              All
            </Chip>
            {CATEGORIES.map((item) => <Chip
    key={item}
    active={category === item}
    onClick={() => setCategory(item)}
    count={RECIPES.filter((r) => r.categories.includes(item)).length}
  >
                {item}
              </Chip>)}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
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

        <section className="mt-12">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {searching ? "Updating results…" : `${results.length} ${results.length === 1 ? "recipe" : "recipes"} match`}
          </p>
          <RecipeGrid
    className="mt-5"
    recipes={results}
    loading={searching}
    empty={<EmptyState
    icon={SearchX}
    title="Nothing matches yet"
    description="Try removing a filter, picking another ingredient or searching for something else."
  >
              <button
    type="button"
    onClick={clearAll}
    className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition duration-300 hover:-translate-y-0.5"
  >
                Clear all filters
              </button>
              <Link
    to="/quick"
    className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
  >
                See 15-minute meals
              </Link>
            </EmptyState>}
  />
        </section>
      </div>
    </Page>;
}
export {
  Route
};
