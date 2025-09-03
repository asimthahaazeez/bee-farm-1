import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, Flag } from "lucide-react";

interface ProfileReviewsProps {
  profileId?: string;
}

const mockReviews = [
  {
    id: "1",
    customer: {
      name: "Mike Thompson",
      avatar: "/placeholder.svg"
    },
    rating: 5,
    title: "Outstanding honey quality!",
    comment: "Sarah's wildflower honey is absolutely incredible. The taste is pure and natural, and you can tell it's from well-cared-for bees. Fast shipping and excellent packaging too. Will definitely order again!",
    images: ["/placeholder.svg"],
    date: "2 weeks ago",
    verified: true,
    helpful: 12,
    product: "Wildflower Honey 500ml"
  },
  {
    id: "2",
    customer: {
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg"
    },
    rating: 5,
    title: "Professional service and amazing honey",
    comment: "I ordered multiple jars for my bakery business. Sarah was incredibly responsive to my questions and the honey arrived perfectly packaged. The quality is consistent and my customers love it in our baked goods.",
    images: [],
    date: "3 weeks ago", 
    verified: true,
    helpful: 8,
    product: "Clover Honey 1kg"
  },
  {
    id: "3",
    customer: {
      name: "David Chen",
      avatar: "/placeholder.svg"
    },
    rating: 4,
    title: "Great honey, minor packaging issue",
    comment: "The honey itself is fantastic - pure, flavorful, and exactly what I was looking for. One jar arrived with a slightly sticky exterior, but Sarah quickly resolved the issue with excellent customer service.",
    images: [],
    date: "1 month ago",
    verified: true,
    helpful: 5,
    product: "Raw Honey 750ml"
  }
];

const ratingDistribution = [
  { stars: 5, count: 18, percentage: 75 },
  { stars: 4, count: 4, percentage: 17 },
  { stars: 3, count: 2, percentage: 8 },
  { stars: 2, count: 0, percentage: 0 },
  { stars: 1, count: 0, percentage: 0 }
];

const ProfileReviews = ({ profileId }: ProfileReviewsProps) => {
  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.8</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < 5 ? 'text-amber fill-current' : 'text-muted'}`} 
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Based on 24 reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center space-x-2">
                  <span className="text-sm w-6">{rating.stars}</span>
                  <Star className="h-3 w-3 text-amber fill-current" />
                  <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber transition-all"
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{rating.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.customer.avatar} alt={review.customer.name} />
                  <AvatarFallback>{review.customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">{review.customer.name}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-amber fill-current' : 'text-muted'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.product}</p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                  </div>

                  {/* Images */}
                  {review.images.length > 0 && (
                    <div className="flex space-x-2">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-4 pt-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Reviews</Button>
      </div>
    </div>
  );
};

export default ProfileReviews;