export function DashboardSkeleton() {
  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 shrink-0" />
              <div className="flex-1 space-y-2 mt-1">
                <div className="h-3.5 bg-gray-100 rounded-full w-28" />
                <div className="h-8 bg-gray-200 rounded-full w-36" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="h-3 bg-gray-100 rounded-full w-16" />
              <div className="h-3 bg-gray-100 rounded-full w-20" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 lg:col-span-2 p-6 flex flex-col animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-5 bg-gray-200 rounded-full w-40" />
            <div className="h-8 bg-gray-100 rounded-lg w-28" />
          </div>
          <div className="flex gap-2 mb-8">
            {[0, 1, 2, 3, 4].map((t) => (
              <div key={t} className="h-8 bg-gray-100 rounded-md w-20" />
            ))}
          </div>
          <div className="h-64 flex items-end gap-3 px-4">
            {[40, 70, 55, 85, 60, 90, 45, 75, 50, 80, 65, 95].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gray-100 rounded-t-md"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-5 bg-gray-200 rounded-full w-36" />
            <div className="h-8 bg-gray-100 rounded-lg w-24" />
          </div>
          <div className="flex justify-center mt-4">
            <div className="w-44 h-44 rounded-full bg-gray-100 relative">
              <div className="absolute inset-7 rounded-full bg-white" />
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {[0, 1, 2, 3].map((r) => (
              <div key={r} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                  <div className="h-3 bg-gray-100 rounded-full w-24" />
                </div>
                <div className="h-3 bg-gray-100 rounded-full w-8" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-6">
          <div className="h-5 bg-gray-200 rounded-full w-36" />
          <div className="h-8 bg-gray-100 rounded-lg w-20" />
        </div>
        <div className="grid grid-cols-5 gap-4 pb-3 border-b border-gray-100 mb-2">
          {[0, 1, 2, 3, 4].map((c) => (
            <div key={c} className="h-3 bg-gray-100 rounded-full w-20" />
          ))}
        </div>
        {[0, 1, 2, 3, 4].map((r) => (
          <div key={r} className="grid grid-cols-5 gap-4 py-3.5 border-b border-gray-50">
            <div className="h-3 bg-gray-100 rounded-full w-24" />
            <div className="h-3 bg-gray-100 rounded-full w-32" />
            <div className="h-3 bg-gray-100 rounded-full w-20" />
            <div className="h-3 bg-gray-100 rounded-full w-16" />
            <div className="h-6 bg-gray-100 rounded-full w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
