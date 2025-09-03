import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Edit, Trash2, BarChart3, Eye } from "lucide-react";

const mockCampaigns = [
  {
    id: "1",
    title: "Wildflower Honey Promotion",
    status: "active",
    budget: 250,
    spent: 187.50,
    impressions: 12847,
    clicks: 342,
    conversions: 23,
    ctr: 2.66,
    cpc: 0.55,
    startDate: "2024-01-15",
    endDate: "2024-02-15"
  },
  {
    id: "2", 
    title: "Organic Beeswax Candles",
    status: "paused",
    budget: 150,
    spent: 89.25,
    impressions: 8234,
    clicks: 156,
    conversions: 8,
    ctr: 1.89,
    cpc: 0.57,
    startDate: "2024-01-10",
    endDate: "2024-02-10"
  },
  {
    id: "3",
    title: "Spring Honey Collection",
    status: "draft",
    budget: 400,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpc: 0,
    startDate: "2024-02-01",
    endDate: "2024-03-01"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-sage text-sage-foreground";
    case "paused": return "bg-amber text-amber-foreground";
    case "draft": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const AdCampaignList = () => {
  return (
    <div className="space-y-4">
      {mockCampaigns.map((campaign) => (
        <Card key={campaign.id} className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg mb-2">{campaign.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                  <span>{campaign.startDate} - {campaign.endDate}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                {campaign.status === "active" ? (
                  <Button variant="outline" size="sm">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </Button>
                ) : (
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Budget and Spend */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="text-lg font-semibold text-foreground">${campaign.budget}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-lg font-semibold text-foreground">${campaign.spent}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-lg font-semibold text-primary">${campaign.budget - campaign.spent}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {Math.round((campaign.spent / campaign.budget) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Eye className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm text-muted-foreground">Impressions</span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {campaign.impressions.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Clicks</p>
                <p className="text-lg font-semibold text-foreground">{campaign.clicks}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Conversions</p>
                <p className="text-lg font-semibold text-sage">{campaign.conversions}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">CTR</p>
                <p className="text-lg font-semibold text-foreground">{campaign.ctr}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">CPC</p>
                <p className="text-lg font-semibold text-foreground">${campaign.cpc}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4 border-t">
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdCampaignList;