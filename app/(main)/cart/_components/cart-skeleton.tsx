import Container from "@/components/container";

export function CartSkeleton() {
  return (
    <Container className="py-6 md:py-8">
      <div className="flex items-center gap-3 mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Shopping Cart
        </h1>
        <div className="h-7 w-20 bg-muted animate-pulse rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border/60">
            <div className="col-span-6 h-5 w-20 bg-muted animate-pulse rounded" />
            <div className="col-span-2 h-5 w-16 bg-muted animate-pulse rounded mx-auto" />
            <div className="col-span-2 h-5 w-20 bg-muted animate-pulse rounded mx-auto" />
            <div className="col-span-2 h-5 w-16 bg-muted animate-pulse rounded ml-auto" />
          </div>

          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 items-center py-4 md:py-6 border-b border-border/60">
              <div className="col-span-6 flex items-center gap-4 w-full">
                <div className="size-20 md:size-24 rounded-2xl bg-muted animate-pulse shrink-0" />
                <div className="flex flex-col gap-2 w-full">
                  <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                </div>
              </div>
              <div className="col-span-2 hidden md:flex justify-center w-full">
                <div className="h-6 w-16 bg-muted animate-pulse rounded" />
              </div>
              <div className="col-span-2 hidden md:flex justify-center w-full">
                <div className="h-10 w-[120px] bg-muted animate-pulse rounded-full" />
              </div>
              <div className="col-span-2 hidden md:flex justify-end w-full">
                <div className="h-6 w-20 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-[#F5F5F5]/60 border border-border/50 rounded-3xl p-6 md:p-8">
            <div className="h-8 w-40 bg-muted animate-pulse rounded mb-6" />
            <div className="flex flex-col gap-4 border-b border-border/60 pb-6 mb-6">
              <div className="flex justify-between items-center">
                <div className="h-5 w-20 bg-muted animate-pulse rounded" />
                <div className="h-5 w-16 bg-muted animate-pulse rounded" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-5 w-20 bg-muted animate-pulse rounded" />
                <div className="h-5 w-16 bg-muted animate-pulse rounded" />
              </div>
            </div>
            <div className="flex justify-between items-center mb-8">
              <div className="h-6 w-16 bg-muted animate-pulse rounded" />
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            </div>
            <div className="w-full h-14 bg-muted animate-pulse rounded-full" />
          </div>
        </div>
      </div>
    </Container>
  );
}
