
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ClubContact = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Want Your Team Featured? 🚀
          </h2>
          <p className="text-xl text-blue-200">Get in touch and join the PlayPulse community</p>
        </div>
        
        <Card className="bg-white/10 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-white">
              Club Registration Form 📋
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clubName" className="text-white">Club/Team Name</Label>
                <Input 
                  id="clubName" 
                  placeholder="e.g., Engineering Basketball Club"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sport" className="text-white">Sport</Label>
                <Input 
                  id="sport" 
                  placeholder="Basketball, Cricket, Football, etc."
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-white">Contact Person</Label>
                <Input 
                  id="contactName" 
                  placeholder="Your full name"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="your.email@university.edu"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">Tell us about your team</Label>
              <Textarea 
                id="message" 
                placeholder="Share details about your team, match schedules, and what you'd like to track..."
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 min-h-24"
              />
            </div>
            
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Submit Application 🎯
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ClubContact;
