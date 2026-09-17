import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CarrotIcon, Clock, IndianRupee, Sparkles } from "lucide-react";
import { Page } from "@/components/Layout";
import { RecipeCard } from "@/components/RecipeCard";
import { CATEGORIES, RECIPES } from "@/data/recipes";
import heroImage from "@/assets/hero-cook.jpg";
const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CookMate \u2014 Cook Delicious Food with What You Already Have" },
      {
        name: "description",
        content: "Beginner-friendly Indian recipes for students and professionals: pick the ingredients you have and cook budget, quick meals step by step."
      },
      { property: "og:title", content: "CookMate \u2014 Cook with what you already have" },
      {
        property: "og:description",
        content: "Easy, budget-friendly recipes with step-by-step guidance for beginner cooks."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ]
  }),
  component: Home
});
const HOW_IT_WORKS = [
  { icon: CarrotIcon, title: "Pick your ingredients", text: "Tell us what's sitting in your kitchen right now." },
  { icon: Sparkles, title: "Get matching recipes", text: "See dishes you can actually make, with cost and time." },
  { icon: Clock, title: "Cook step by step", text: "Follow one instruction at a time with a progress bar." }
];
const TESTIMONIALS = [
  { name: "Aarav, engineering student", text: "I cooked my first proper dinner with three things from my hostel shelf." },
  { name: "Divya, first job in Pune", text: "The budget filter is perfect at the end of the month." },
  { name: "Rohit, bachelor life", text: "Step navigation means I never lose track mid-cooking." }
];
function Home() {
  const popular = RECIPES.slice(0, 6);
  return <Page>
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
              <Sparkles className="size-4" /> Your everyday cooking companion
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
              Cook Delicious Food with What You Already Have
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              A cooking companion for students, bachelors, and professionals living away from home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
    to="/discover"
    className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lift transition hover:-translate-y-0.5 hover:bg-primary/90"
  >
                Find Recipes <ArrowRight className="size-5" />
              </Link>
              <Link
    to="/quick"
    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
  >
                10-minute meals
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <img
    src={heroImage}
    alt="Simple home-cooked Indian meal with rice, eggs and fresh vegetables"
    width={1280}
    height={960}
    className="h-full w-full object-cover"
  />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Popular Recipes</h2>
          <Link to="/discover" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((r) => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Categories</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => <Link
    key={c}
    to="/discover"
    search={{ category: c }}
    className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
  >
              {c}
            </Link>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">How It Works</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {HOW_IT_WORKS.map((s) => <div key={s.title} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
              <span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                <s.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
            </div>)}
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">What cooks say</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => <figure key={t.name} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <blockquote className="text-base text-foreground">“{t.text}”</blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">{t.name}</figcaption>
              </figure>)}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-3xl bg-primary p-8 text-primary-foreground">
            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold">Cooking on a tight budget?</h3>
              <p className="mt-1 text-primary-foreground/85">Meals under ₹50 that still taste like home.</p>
            </div>
            <Link
    to="/budget"
    className="inline-flex items-center gap-1 rounded-full bg-card px-6 py-3 text-base font-semibold text-primary transition hover:-translate-y-0.5"
  >
              <IndianRupee className="size-4" /> Budget meals
            </Link>
          </div>
        </div>
      </section>
    </Page>;
}
export {
  Route
};
