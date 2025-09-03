import { useState, useEffect } from "react";
import SocialPost from "./SocialPost";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingStates from "@/components/LoadingStates";

// Mock data for demonstration
const mockPosts = [
  {
    id: "1",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      verified: true,
      location: "Vermont, USA"
    },
    content: "Just harvested 50 lbs of wildflower honey from my backyard hives! The bees were incredibly productive this season. The color is absolutely gorgeous - golden amber with hints of clover. 🍯",
    images: ["/placeholder.svg"],
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3,
    tags: ["#wildflowerhoney", "#harvest", "#backyard"]
  },
  {
    id: "2", 
    author: {
      name: "Mike Chen",
      avatar: "/placeholder.svg",
      verified: false,
      location: "California, USA"
    },
    content: "New beekeeper here! Just installed my first package of bees yesterday. Any tips for a beginner? The queen seems to be doing well and the workers are already starting to build comb.",
    images: [],
    timestamp: "4 hours ago",
    likes: 12,
    comments: 15,
    shares: 2,
    tags: ["#newbeekeeper", "#beginners", "#advice"]
  },
  {
    id: "3",
    author: {
      name: "Emma Martinez",
      avatar: "/placeholder.svg", 
      verified: true,
      location: "Texas, USA"
    },
    content: "Swarm season is here! Caught three swarms this week alone. There's nothing quite like the excitement of a successful swarm capture. These ladies will make great new colonies. 🐝",
    images: ["/placeholder.svg", "/placeholder.svg"],
    timestamp: "1 day ago",
    likes: 45,
    comments: 12,
    shares: 7,
    tags: ["#swarmseason", "#capture", "#colonies"]
  }
];

const SocialFeed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Simulate loading posts
    const loadPosts = () => {
      setTimeout(() => {
        setPosts(mockPosts);
        setLoading(false);
      }, 1000);
    };

    loadPosts();
  }, []);

  const loadMorePosts = () => {
    // Simulate loading more posts
    setTimeout(() => {
      const newPosts = mockPosts.map(post => ({
        ...post,
        id: post.id + "_" + Date.now(),
        timestamp: "3 days ago"
      }));
      setPosts(prev => [...prev, ...newPosts]);
    }, 500);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingStates.SocialPost />
        <LoadingStates.SocialPost />
        <LoadingStates.SocialPost />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <SocialPost key={post.id} post={post} />
      ))}
      
      {hasMore && (
        <div className="text-center py-8">
          <button
            onClick={loadMorePosts}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Load More Posts
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialFeed;