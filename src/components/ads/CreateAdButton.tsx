import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CreateAdButton = () => {
  const handleCreateAd = () => {
    // Handle ad creation
    console.log("Creating new ad campaign...");
  };

  return (
    <Button onClick={handleCreateAd} className="bg-primary hover:bg-primary/90">
      <Plus className="h-4 w-4 mr-2" />
      Create Campaign
    </Button>
  );
};

export default CreateAdButton;