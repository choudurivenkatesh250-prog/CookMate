import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  Clock,
  IndianRupee,
  RotateCcw,
  SearchX,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { Page } from "@/components/Layout";
import { RecipeGrid } from "@/components/RecipeGrid";
import { RecipeDetailSkeleton } from "@/components/Skeleton";
import { SectionHeading } from "@/components/SectionHeading";
import { RECIPES, getRecipe } from "@/data/recipes";
import { useBookmarks } from "@/hooks/useBookmarks";
const Route = createFileRoute("/recipes/$recipeId")({
  loader: ({ params }) => {
    const recipe = getRecipe(params.recipeId);
    if (!recipe) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Recipe unavailable \u2014 CookMate" }, { name: "robots", content: "noindex" }]
      };
    }
    const { recipe } = loaderData;
    return {
      meta: [
        { title: `${recipe.title} Recipe \u2014 CookMate` },
        { name: "description", content: recipe.description },
        { property: "og:title", content: `${recipe.title} Recipe \u2014 CookMate` },
        { property: "og:description", content: recipe.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" }
      ]
    };
  },
  pendingComponent: RecipeDetailPending,
  notFoundComponent: RecipeNotFound,
  component: RecipeDetail
});
function RecipeDetailPending() {
  return <Page>
      <RecipeDetailSkeleton />
    </Page>;
}
function RecipeNotFound() {
  return <Page>
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="animate-fade-up rounded-[2rem] border border-dashed border-border bg-card/60 px-6 py-16 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <SearchX className="size-6" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-foreground">
            We couldn't find that recipe
          </h1>
          <p className="mx-auto mt-2 max-w-md leading-relaxed text-muted-foreground">
            It may have been renamed or removed. Have a look at everything else on the menu.
          </p>
          <Link
    to="/discover"
    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition duration-300 hover:-translate-y-0.5"
  >
            Browse all recipes <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </Page>;
}
function RecipeDetail() {
  const { recipe } = Route.useLoaderData();
  const { isSaved, toggle } = useBookmarks();
  const [step, setStep] = useState(0);
  const [checked, setChecked] = useState([]);
  const saved = isSaved(recipe.id);
  const vegetarian = !recipe.categories.includes("Non-Vegetarian");
  const progress = (step + 1) / recipe.steps.length * 100;
  const readyCount = recipe.ingredients.filter((ingredient) => checked.includes(ingredient)).length;

  // Left and right arrow keys move through the cooking steps.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      setStep((current) => Math.min(Math.max(current + direction, 0), recipe.steps.length - 1));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [recipe.steps.length]);

  const toggleIngredient = (ingredient) => setChecked((prev) => prev.includes(ingredient) ? prev.filter((x) => x !== ingredient) : [...prev, ingredient]);

  const related = RECIPES.filter((item) => item.id !== recipe.id)
    .map((item) => ({
      recipe: item,
      score: item.ingredients.filter((i) => recipe.ingredients.includes(i)).length +
        (item.categories.some((category) => recipe.categories.includes(category)) ? 1 : 0)
    }))
    .sort((a, b) => b.score - a.score || a.recipe.cookingTime - b.recipe.cookingTime)
    .slice(0, 3)
    .map((entry) => entry.recipe);
  return <Page>
      <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Link to="/discover" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Back to recipes
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-10">
          <div className="animate-scale-in overflow-hidden rounded-[2rem] border border-border bg-card shadow-lift">
            <img
    src={recipe.image}
    alt={recipe.title}
    width={944}
    height={704}
    className="h-full w-full object-cover"
  />
          </div>

          <div className="animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-[11px] font-semibold text-foreground shadow-soft">
                <span className={`grid size-3.5 place-items-center rounded-[3px] border ${vegetarian ? "border-emerald-600" : "border-rose-600"}`}>
                  <span className={`size-1.5 rounded-full ${vegetarian ? "bg-emerald-600" : "bg-rose-600"}`} />
                </span>
                {vegetarian ? "Vegetarian" : "Contains egg"}
              </span>
              <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-foreground">
                {recipe.categories[0]}
              </span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              {recipe.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              {recipe.description}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat icon={<Clock className="size-4" />} label="Time" value={`${recipe.cookingTime} min`} />
              <Stat icon={<IndianRupee className="size-4" />} label="Cost" value={`\u20B9${recipe.cost}`} />
              <Stat icon={<Users className="size-4" />} label="Serves" value={`${recipe.servings}`} />
              <Stat label="Level" value={recipe.difficulty} />
            </dl>

            <button
    type="button"
    onClick={() => toggle(recipe.id)}
    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5"
  >
              <Bookmark className={`size-4 ${saved ? "fill-current" : ""}`} />
              {saved ? "Saved" : "Save recipe"}
            </button>

            <a
    href="#ingredients"
    className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
  >
              <CheckCircle2 className="size-4 text-primary" /> Check off your ingredients
            </a>
          </div>
        </div>

        <section className="mt-12 rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
            <div id="ingredients" className="scroll-mt-24">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl font-bold text-foreground">Ingredients</h2>
                <span className="text-xs font-semibold text-muted-foreground">
                  {readyCount} of {recipe.ingredients.length} ready
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {recipe.ingredients.map((ingredient) => {
                  const done = checked.includes(ingredient);
                  return <li key={ingredient}>
                      <button
                        type="button"
                        onClick={() => toggleIngredient(ingredient)}
                        aria-pressed={done}
                        className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition duration-200 ${done ? "border-primary/40 bg-accent text-accent-foreground" : "border-border bg-background text-foreground hover:border-primary/40 hover:text-primary"}`}
                      >
                        <span className={`grid size-5 shrink-0 place-items-center rounded-full border ${done ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent"}`}>
                          <Check className="size-3" />
                        </span>
                        {ingredient}
                      </button>
                    </li>;
                })}
              </ul>
              <button
                type="button"
                onClick={() => setChecked([])}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition hover:text-primary"
              >
                <RotateCcw className="size-3.5" /> Reset checklist
              </button>
              <div className="mt-6 rounded-2xl bg-muted/70 p-4">
                <p className="text-sm font-semibold text-foreground">Costs about ₹{recipe.cost}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Rough estimate for {recipe.servings} {recipe.servings === 1 ? "serving" : "servings"} at local prices.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl font-bold text-foreground">Step-by-step</h2>
                <span className="text-sm text-muted-foreground">
                  Step {step + 1} of {recipe.steps.length}
                </span>
              </div>

              <div
                className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-label="Cooking progress"
              >
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

          <p className="mt-6 text-xl leading-relaxed text-foreground sm:text-2xl">
                {recipe.steps[step]}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  <ArrowLeft className="size-4" /> Previous step
                </button>
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(recipe.steps.length - 1, s + 1))}
                  disabled={step === recipe.steps.length - 1}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  Next step <ArrowRight className="size-4" />
                </button>
              </div>

              <div className="mt-6 flex items-center gap-1.5">
                {recipe.steps.map((s, i) => <button
                  key={s}
                  type="button"
                  onClick={() => setStep(i)}
                  aria-label={`Go to step ${i + 1}`}
                  aria-current={i === step}
                  className={`h-2 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/40"}`}
                />)}
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Tip: the left and right arrow keys move between steps.
              </p>

          <ol className="mt-8 space-y-2 border-t border-border pt-6">
                {recipe.steps.map((s, i) => <li key={s}>
                    <button
                      type="button"
                      onClick={() => setStep(i)}
                      className={`flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition ${i === step ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"}`}
                    >
                      <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        {i + 1}
                      </span>
                      {s}
                    </button>
                  </li>)}
              </ol>
            </div>
          </div>
        </section>

        {related.length > 0 ? <section className="mt-14">
            <SectionHeading
    eyebrow="Keep cooking"
    title="You might also like"
    description="Recipes that share ingredients with this one."
  />
            <RecipeGrid className="mt-6" recipes={related} />
          </section> : null}
      </article>
    </Page>;
}
function Stat({ icon, label, value }) {
  return <div className="rounded-2xl border border-border bg-card p-3">
      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon} {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-foreground">{value}</dd>
    </div>;
}
export {
  Route
};
