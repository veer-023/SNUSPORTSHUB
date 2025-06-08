import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import RealTimeSportsTracker from "@/components/RealTimeSportsTracker";

const RealTimeTracker = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Back Button */}
      <div className="p-4">
        <Link to="/">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <RealTimeSportsTracker />
    </div>
  );
};

export default RealTimeTracker;
