import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const funnelData = [
  { stage: "Store Visits", count: 2847, percentage: 100, color: "bg-sky" },
  { stage: "Product Views", count: 1523, percentage: 53.5, color: "bg-sage" },
  { stage: "Add to Cart", count: 542, percentage: 19.0, color: "bg-amber" },
  { stage: "Checkout Started", count: 387, percentage: 13.6, color: "bg-honey" },
  { stage: "Orders Completed", count: 289, percentage: 10.1, color: "bg-primary" }
];

const ConversionFunnel = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <p className="text-sm text-muted-foreground">Customer journey from visit to purchase</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelData.map((stage, index) => {
            const barWidth = stage.percentage;
            const dropoff = index > 0 ? funnelData[index - 1].count - stage.count : 0;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{stage.stage}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-foreground">{stage.count.toLocaleString()}</span>
                    <span className="text-xs text-muted-foreground ml-2">({stage.percentage}%)</span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-muted/30 rounded-full h-8 flex items-center overflow-hidden">
                    <div 
                      className={`h-full ${stage.color} rounded-full transition-all duration-500 flex items-center justify-end pr-3`}
                      style={{ width: `${barWidth}%` }}
                    >
                      <span className="text-xs font-medium text-card-foreground">
                        {stage.percentage}%
                      </span>
                    </div>
                  </div>
                  
                  {dropoff > 0 && (
                    <div className="absolute -bottom-5 right-0 text-xs text-destructive">
                      -{dropoff} lost
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-8 pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Conversion Rate:</span>
            <span className="font-semibold text-primary">10.1%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cart Abandonment Rate:</span>
            <span className="font-semibold text-destructive">46.7%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Average Order Value:</span>
            <span className="font-semibold text-foreground">$34.60</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionFunnel;