

export const LoadingSqueleton = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-2 text-sm text-gray-300 mb-6">
        <div className="h-4 w-16 bg-gray-200  animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200  animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-200  animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200  animate-pulse"></div>
        <div className="h-4 w-32 bg-gray-200  animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="space-y-4">
          <div className="bg-gray-200 -lg aspect-[3/4] animate-pulse"></div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200  aspect-square animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="h-4 w-32 bg-gray-200  animate-pulse"></div>
          <div className="h-8 w-64 bg-gray-200  animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200  animate-pulse"></div>
          
          {/* Price skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-20 bg-gray-200  animate-pulse"></div>
            <div className="h-6 w-16 bg-gray-200  animate-pulse"></div>
          </div>

          {/* Sizes skeleton */}
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200  animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-10 w-16 bg-gray-200  animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Add to cart skeleton */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-4 w-16 bg-gray-200  animate-pulse"></div>
              <div className="flex items-center border border-gray-300 ">
                <div className="h-10 w-10 bg-gray-200 animate-pulse"></div>
                <div className="h-10 w-12 bg-gray-200 animate-pulse"></div>
                <div className="h-10 w-10 bg-gray-200 animate-pulse"></div>
              </div>
            </div>
            <div className="h-12 w-full bg-gray-200  animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
    )
}