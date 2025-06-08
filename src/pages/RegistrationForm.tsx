import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";

// The import for Navigation has been removed to resolve an error.
// A simple placeholder Navigation component is now defined below.

// A placeholder Navigation component to resolve the import error.
// You can replace this with your actual Navigation component if needed.
const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-gray-800">SNU Sports Portal</h1>
      </div>
    </nav>
  );
};


const RegistrationForm = () => {
  // All the previous state and handler functions have been removed
  // as the embedded Google Form now manages the form's state and submission.

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      {/* Header Section - Kept for consistent UI */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-200">
            📝 Player Registration
          </Badge>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Join SNU Sports Community
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Register as a player to participate in tournaments, track your performance, 
            and be part of the exciting sports ecosystem at Shiv Nadar University.
          </p>
        </div>
      </section>

      {/* Registration Form Section - Now with the embedded Google Form */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-6 h-6 text-blue-600" />
                <span>Player Registration Form</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* The Google Form iframe is placed here.
                I've set the width to "100%" to make it responsive 
                and fit nicely within the card on all screen sizes.
              */}
              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSdFHEkRNYB-u9UgcuK0ibDSBDTPopcikJRouUBiDqPpQ7AQ5Q/viewform?embedded=true" 
                width="100%" 
                height="2200" // Adjusted height slightly for better fit, can be changed
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                className="rounded-md"
              >
                Loading…
              </iframe>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default RegistrationForm;