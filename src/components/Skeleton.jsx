function Skeleton({ className = "" }) {
  return <div aria-hidden="true" className={`relative overflow-hidden bg-muted ${className}`}>
      <div className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-background/70 to-transparent" />
    </div>;
}
function RecipeCardSkeleton() {
  return <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <Skeleton className="aspect-[4/3]" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="h-5 w-3/4 rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-2/3 rounded-full" />
        <div className="flex items-center gap-3 border-t border-border pt-4">
          <Skeleton className="h-4 w-16 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="ml-auto h-4 w-10 rounded-full" />
        </div>
      </div>
    </div>;
}
function RecipeDetailSkeleton() {
  return <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6" aria-hidden="true">
      <Skeleton className="h-5 w-36 rounded-full" />
      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <Skeleton className="aspect-[4/3] rounded-[2rem]" />
        <div className="space-y-4">
          <Skeleton className="h-5 w-28 rounded-full" />
          <Skeleton className="h-9 w-4/5 rounded-2xl" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-3/4 rounded-full" />
          <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
          </div>
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>
    </div>;
}
export {
  RecipeCardSkeleton,
  RecipeDetailSkeleton,
  Skeleton
};