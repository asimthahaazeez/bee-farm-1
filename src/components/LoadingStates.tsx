import { Card } from "@/components/ui/card";

export const WeatherSkeleton = () => {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-6 bg-muted shimmer rounded-lg w-48"></div>
        <div className="h-8 w-8 bg-muted shimmer rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="text-center space-y-2">
            <div className="h-5 w-5 bg-muted shimmer rounded-full mx-auto"></div>
            <div className="h-4 bg-muted shimmer rounded w-12 mx-auto"></div>
            <div className="h-6 bg-muted shimmer rounded w-8 mx-auto"></div>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-muted/50 rounded-xl">
        <div className="h-4 bg-muted shimmer rounded w-3/4"></div>
      </div>
    </Card>
  );
};

export const HiveSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-muted shimmer"></div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-6 bg-muted shimmer rounded w-32"></div>
          <div className="h-4 bg-muted shimmer rounded w-24"></div>
          <div className="h-4 bg-muted shimmer rounded w-28"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="h-4 bg-muted shimmer rounded w-16"></div>
            <div className="h-6 bg-muted shimmer rounded w-20"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-muted shimmer rounded w-20"></div>
            <div className="h-6 bg-muted shimmer rounded w-16"></div>
          </div>
        </div>
        
        <div className="h-12 bg-muted/50 shimmer rounded-xl"></div>
        <div className="h-16 bg-muted/30 shimmer rounded-xl"></div>
        
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-muted shimmer rounded-xl"></div>
          <div className="flex-1 h-10 bg-muted shimmer rounded-xl"></div>
        </div>
      </div>
    </Card>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Hero skeleton */}
      <div className="min-h-[400px] bg-gradient-to-br from-honey-light/50 via-honey/50 to-amber/50 rounded-3xl p-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <div className="h-12 bg-muted/30 shimmer rounded w-64"></div>
            <div className="h-6 bg-muted/30 shimmer rounded w-96"></div>
            <WeatherSkeleton />
            <div className="flex gap-4">
              <div className="h-12 bg-muted/30 shimmer rounded-2xl w-32"></div>
              <div className="h-12 bg-muted/30 shimmer rounded-2xl w-28"></div>
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full h-80 bg-muted/30 shimmer rounded-3xl"></div>
          </div>
        </div>
      </div>
      
      {/* Weather dashboard skeleton */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="h-10 bg-muted shimmer rounded w-80 mx-auto"></div>
          <div className="h-6 bg-muted shimmer rounded w-96 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-6 space-y-3 text-center">
              <div className="h-8 w-8 bg-muted shimmer rounded mx-auto"></div>
              <div className="h-5 bg-muted shimmer rounded w-24 mx-auto"></div>
              <div className="h-8 bg-muted shimmer rounded w-16 mx-auto"></div>
              <div className="h-4 bg-muted shimmer rounded w-20 mx-auto"></div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Hives skeleton */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-10 bg-muted shimmer rounded w-48"></div>
            <div className="h-6 bg-muted shimmer rounded w-64"></div>
          </div>
          <div className="h-12 bg-muted shimmer rounded-2xl w-36"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <HiveSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default { WeatherSkeleton, HiveSkeleton, DashboardSkeleton };