import { useState } from "react";
import BeekeeperCard from "./BeekeeperCard";
import LoadingStates from "@/components/LoadingStates";

// Mock data for beekeepers
const mockBeekeepers = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    location: "Vermont, USA",
    specialties: ["Organic Honey", "Queen Rearing", "Pollination Services"],
    rating: 4.8,
    reviewCount: 24,
    verified: true,
    yearsExperience: 12,
    hiveCount: 45,
    products: ["Wildflower Honey", "Beeswax Candles", "Royal Jelly"],
    bio: "Passionate about sustainable beekeeping practices and organic honey production."
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/placeholder.svg",
    location: "California, USA",
    specialties: ["Urban Beekeeping", "Swarm Removal", "Education"],
    rating: 4.6,
    reviewCount: 18,
    verified: false,
    yearsExperience: 8,
    hiveCount: 23,
    products: ["Clover Honey", "Propolis", "Bee Pollen"],
    bio: "Urban beekeeper specializing in rooftop apiaries and educational workshops."
  },
  {
    id: "3",
    name: "Emma Martinez",
    avatar: "/placeholder.svg",
    location: "Texas, USA",
    specialties: ["Commercial Production", "Honey Processing", "Equipment"],
    rating: 4.9,
    reviewCount: 67,
    verified: true,
    yearsExperience: 15,
    hiveCount: 120,
    products: ["Mesquite Honey", "Honeycomb", "Beekeeping Tools"],
    bio: "Third-generation beekeeper with extensive commercial honey production experience."
  },
  {
    id: "4",
    name: "David Wilson",
    avatar: "/placeholder.svg",
    location: "Oregon, USA",
    specialties: ["Natural Beekeeping", "Treatment-Free", "Bee Breeding"],
    rating: 4.7,
    reviewCount: 31,
    verified: true,
    yearsExperience: 20,
    hiveCount: 67,
    products: ["Raw Honey", "Bee Bread", "Nucleus Colonies"],
    bio: "Advocate for treatment-free beekeeping and natural hive management techniques."
  },
  {
    id: "5",
    name: "Lisa Thompson",
    avatar: "/placeholder.svg",
    location: "Maine, USA",
    specialties: ["Cold Climate", "Overwintering", "Maple Honey"],
    rating: 4.5,
    reviewCount: 19,
    verified: false,
    yearsExperience: 6,
    hiveCount: 18,
    products: ["Basswood Honey", "Beeswax Products", "Hive Tours"],
    bio: "Specializing in cold climate beekeeping and unique New England honey varieties."
  },
  {
    id: "6",
    name: "Robert Garcia",
    avatar: "/placeholder.svg",
    location: "Arizona, USA",
    specialties: ["Desert Beekeeping", "Palo Verde Honey", "Hot Climate"],
    rating: 4.8,
    reviewCount: 42,
    verified: true,
    yearsExperience: 11,
    hiveCount: 89,
    products: ["Palo Verde Honey", "Mesquite Pollen", "Desert Honeycomb"],
    bio: "Expert in desert beekeeping techniques and unique Southwestern honey varieties."
  }
];

const BeekeeperGrid = () => {
  const [beekeepers] = useState(mockBeekeepers);
  const [loading] = useState(false);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <LoadingStates.BeekeeperCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {beekeepers.map((beekeeper) => (
        <BeekeeperCard key={beekeeper.id} beekeeper={beekeeper} />
      ))}
    </div>
  );
};

export default BeekeeperGrid;
