import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CarrotIcon,
  Clock,
  Cookie,
  Drumstick,
  Flame,
  IndianRupee,
  Leaf,
  Moon,
  Salad,
  Sparkles,
  Star,
  Sunrise,
  Timer,
  UtensilsCrossed
} from "lucide-react";
import { Page } from "@/components/Layout";
import { FeaturedRecipe } from "@/components/FeaturedRecipe";
import { RecipeGrid } from "@/components/RecipeGrid";
import { SectionHeading } from "@/components/SectionHeading";
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
  { name: "Aarav", role: "Engineering student", text: "I cooked my first proper dinner with three things from my hostel shelf." },
  { name: "Divya", role: "First job in Pune", text: "The budget filter is perfect at the end of the month." },
  { name: "Rohit", role: "Bachelor life", text: "Step navigation means I never lose track mid-cooking." }
];
const CATEGORY_ICONS = {
  Breakfast: Sunrise,
  Lunch: UtensilsCrossed,
  Dinner: Moon,
  Snacks: Cookie,
  "South Indian": Leaf,
  "North Indian": Flame,
  Vegetarian: Salad,
  "Non-Vegetarian": Drumstick
};
const FEATURED_SPOTLIGHT = "paneer-bhurji";
const FEATURED_MORE = ["lemon-rice", "moong-dal-khichdi", "aloo-gobi"];
const TOTAL_RECIPES = RECIPES.length;
const AVERAGE_COST = Math.round(
  RECIPES.reduce((sum, recipe) => sum + recipe.cost, 0) / (TOTAL_RECIPES || 1)
);
const FASTEST_TIME = TOTAL_RECIPES ? Math.min(...RECIPES.map((recipe) => recipe.cookingTime)) : 0;
const HERO_STATS = [
  { label: "Recipes", value: `${TOTAL_RECIPES}` },
  { label: "Average meal", value: `₹${AVERAGE_COST}` },
  { label: "Fastest", value: `${FASTEST_TIME} min` }
];
function Home() {
  const spotlight = RECIPES.find((r) => r.id === FEATURED_SPOTLIGHT) ?? RECIPES[0];
  const featured = FEATURED_MORE.map((id) => RECIPES.find((r) => r.id === id)).filter(Boolean);
  const popular = RECIPES.slice(0, 6);
  return <Page>
      <section className="relative overflow-hidden bg-hero">
        <div className="pointer-events-none absolute -left-24 top-6 size-64 animate-float-slow rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 size-72 animate-float rounded-full bg-accent-warm/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-1.5 text-sm font-medium text-accent-foreground shadow-soft backdrop-blur">
              <Sparkles className="size-4 text-primary" /> Your everyday cooking companion
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              Cook delicious food with <span className="text-gradient">what you already have</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              A cooking companion for students, bachelors and professionals living away from home.
              Pick your ingredients, get a matching recipe and cook it step by step.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
    to="/discover"
    className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lift transition duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
  >
                Find recipes
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
    to="/quick"
    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
  >
                <Timer className="size-5 text-primary" /> Meals in {FASTEST_TIME || 10} minutes
              </Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {HERO_STATS.map((stat) => <div key={stat.label} className="rounded-2xl border border-border/70 bg-card/70 px-4 py-3 backdrop-blur">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-bold text-foreground">
                    {stat.value}
                  </dd>
                </div>)}
            </dl>
          </div>
          <div className="relative animate-scale-in">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-glow">
              <img
    src={heroImage}
    alt="Simple home-cooked Indian meal with rice, eggs and fresh vegetables"
    width={1280}
    height={960}
    className="h-full w-full object-cover"
  />
            </div>
            <div className="absolute -left-4 bottom-8 hidden animate-float rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lift backdrop-blur sm:block">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5 text-primary" /> Fastest recipe
              </p>
              <p className="mt-0.5 font-display text-lg font-bold text-foreground">
                {FASTEST_TIME} minutes
              </p>
            </div>
            <div className="absolute -right-3 top-8 hidden animate-float-slow rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lift backdrop-blur sm:block">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <IndianRupee className="size-3.5 text-primary" /> Average meal
              </p>
              <p className="mt-0.5 font-display text-lg font-bold text-foreground">
                ₹{AVERAGE_COST}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeading
    eyebrow="Hand-picked"
    title="Featured this week"
    description="A few favourites our cooks keep coming back to."
    action={<Link to="/discover" className="text-sm font-semibold text-primary hover:underline">
            View all recipes
          </Link>}
  />
        {spotlight ? <div className="mt-7">
            <FeaturedRecipe recipe={spotlight} />
          </div> : null}
        {featured.length > 0 ? <RecipeGrid className="mt-6" recipes={featured} /> : null}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeading
    eyebrow="Most cooked"
    title="Popular Recipes"
    description="Beginner-friendly meals that work with everyday ingredients."
    action={<Link to="/discover" className="text-sm font-semibold text-primary hover:underline">
            View all recipes
          </Link>}
  />
        <RecipeGrid className="mt-7" recipes={popular} />
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
    eyebrow="Browse"
    title="Categories"
    description="Jump straight to the kind of meal you feel like cooking."
  />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category] ?? UtensilsCrossed;
              const count = RECIPES.filter((recipe) => recipe.categories.includes(category)).length;
              return <Link
                key={category}
                to="/discover"
                search={{ category }}
                className="group animate-fade-up rounded-3xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground transition-transform duration-500 group-hover:scale-110">
                  <Icon className="size-5" />
                </span>
                <p className="mt-4 font-semibold text-foreground">{category}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {count} {count === 1 ? "recipe" : "recipes"}
                </p>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SectionHeading
    eyebrow="Three steps"
    title="How It Works"
    description="No shopping trip and no guesswork — cook with what is already in your kitchen."
  />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {HOW_IT_WORKS.map((step, index) => <div
    key={step.title}
    className="group animate-fade-up rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
    style={{ animationDelay: `${index * 80}ms` }}
  >
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground transition-transform duration-500 group-hover:scale-110">
                  <step.icon className="size-5" />
                </span>
                <span className="font-display text-3xl font-bold text-border">0{index + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>)}
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
    align="center"
    eyebrow="Loved by beginners"
    title="What cooks say"
    description="Notes from people cooking for themselves for the first time."
  />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => <figure
    key={testimonial.name}
    className="animate-fade-up rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    style={{ animationDelay: `${index * 80}ms` }}
  >
                <div className="flex items-center gap-1 text-primary" aria-hidden="true">
                  <Star className="size-4 fill-current" />
                  <Star className="size-4 fill-current" />
                  <Star className="size-4 fill-current" />
                  <Star className="size-4 fill-current" />
                  <Star className="size-4 fill-current" />
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-foreground">
                  “{testimonial.text}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-accent font-display text-sm font-bold text-accent-foreground">
                    {testimonial.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>)}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-6 rounded-[2rem] bg-primary p-8 text-primary-foreground shadow-lift sm:p-10">
            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">
                Cooking on a tight budget?
              </h3>
              <p className="mt-2 text-primary-foreground/85">
                Meals under ₹50 that still taste like home — pick your limit and see what fits.
              </p>
            </div>
            <Link
    to="/budget"
    className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-base font-semibold text-primary transition duration-300 hover:-translate-y-0.5"
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
