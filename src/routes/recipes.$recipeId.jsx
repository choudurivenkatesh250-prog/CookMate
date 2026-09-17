import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Bookmark, Clock, IndianRupee, Users } from "lucide-react";
import { Page } from "@/components/Layout";
import { getRecipe } from "@/data/recipes";
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
  component: RecipeDetail
});
function RecipeDetail() {
  const { recipe } = Route.useLoaderData();
  const { isSaved, toggle } = useBookmarks();
  const [step, setStep] = useState(0);
  const saved = isSaved(recipe.id);
  const progress = (step + 1) / recipe.steps.length * 100;
  return <Page>
      <article className="mx-auto max-w-5xl px-4 py-8">
        <Link to="/discover" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Back to recipes
        </Link>

        <div className="mt-5 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <img
    src={recipe.image}
    alt={recipe.title}
    width={944}
    height={704}
    className="h-full w-full object-cover"
  />
          </div>

          <div>
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{recipe.title}</h1>
            <p className="mt-3 text-muted-foreground">{recipe.description}</p>

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

            <h2 className="mt-8 font-display text-xl font-bold text-foreground">Ingredients</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {recipe.ingredients.map((i) => <li key={i} className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                  {i}
                </li>)}
            </ul>
          </div>
        </div>

        <section className="mt-12 rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">Step-by-step</h2>
            <span className="text-sm text-muted-foreground">
              Step {step + 1} of {recipe.steps.length}
            </span>
          </div>

          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
            <div
    className="h-full rounded-full bg-primary transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
          </div>

          <p className="mt-6 text-xl leading-relaxed text-foreground sm:text-2xl">{recipe.steps[step]}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
    type="button"
    onClick={() => setStep((s) => Math.max(0, s - 1))}
    disabled={step === 0}
    className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
  >
              <ArrowLeft className="size-4" /> Previous Step
            </button>
            <button
    type="button"
    onClick={() => setStep((s) => Math.min(recipe.steps.length - 1, s + 1))}
    disabled={step === recipe.steps.length - 1}
    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
  >
              Next Step <ArrowRight className="size-4" />
            </button>
          </div>

          <ol className="mt-8 space-y-2 border-t border-border pt-6">
            {recipe.steps.map((s, i) => <li key={s}>
                <button
    type="button"
    onClick={() => setStep(i)}
    className={`flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition ${i === step ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"}`}
  >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  {s}
                </button>
              </li>)}
          </ol>
        </section>
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
