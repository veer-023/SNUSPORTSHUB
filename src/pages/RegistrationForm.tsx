import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Upload, User, Mail, Phone, Calendar, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegistrationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    studentId: "",
    course: "",
    yearOfStudy: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    jerseyNumber: "",
    position: "",
    bio: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    preferredSports: [] as string[],
    termsAccepted: false
  });

  const sports = [
    { id: "basketball", label: "🏀 Basketball" },
    { id: "cricket", label: "🏏 Cricket" },
    { id: "football", label: "⚽ Football" },
    { id: "badminton", label: "🏸 Badminton" }
  ];

  const courses = [
    "Computer Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Business Administration",
    "Economics",
    "Psychology",
    "English Literature",
    "Mathematics",
    "Physics",
    "Chemistry"
  ];

  const handleSportChange = (sportId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferredSports: checked 
        ? [...prev.preferredSports, sportId]
        : prev.preferredSports.filter(s => s !== sportId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }

    if (formData.preferredSports.length === 0) {
      toast({
        title: "Sports Selection Required",
        description: "Please select at least one sport.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your Supabase database
    console.log("Registration data:", formData);
    
    toast({
      title: "Registration Submitted!",
      description: "Your registration has been submitted successfully. You'll receive a confirmation email shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      {/* Header Section */}
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

      {/* Registration Form */}
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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@snu.edu.in"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="studentId">Student ID *</Label>
                      <Input
                        id="studentId"
                        placeholder="SNU20XXXXXX"
                        value={formData.studentId}
                        onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="course">Course/Program *</Label>
                      <Select value={formData.course} onValueChange={(value) => setFormData(prev => ({ ...prev, course: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="yearOfStudy">Year of Study *</Label>
                      <Select value={formData.yearOfStudy} onValueChange={(value) => setFormData(prev => ({ ...prev, yearOfStudy: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                          <SelectItem value="5">5th Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Sports Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                    Sports Information
                  </h3>
                  
                  <div className="mb-4">
                    <Label className="text-base font-medium mb-3 block">Preferred Sports *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {sports.map((sport) => (
                        <div key={sport.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={sport.id}
                            checked={formData.preferredSports.includes(sport.id)}
                            onCheckedChange={(checked) => handleSportChange(sport.id, checked as boolean)}
                          />
                          <Label htmlFor={sport.id} className="cursor-pointer">
                            {sport.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="175"
                        value={formData.height}
                        onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={formData.weight}
                        onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="jerseyNumber">Preferred Jersey No.</Label>
                      <Input
                        id="jerseyNumber"
                        type="number"
                        placeholder="10"
                        value={formData.jerseyNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, jerseyNumber: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">Preferred Position</Label>
                      <Input
                        id="position"
                        placeholder="e.g., Forward, Midfielder"
                        value={formData.position}
                        onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio / Playing Experience</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about your sports background, achievements, and what motivates you..."
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContactName">Contact Name *</Label>
                      <Input
                        id="emergencyContactName"
                        placeholder="Parent/Guardian name"
                        value={formData.emergencyContactName}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                      <Input
                        id="emergencyContactPhone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, emergencyContactPhone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I agree to the{" "}
                      <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and{" "}
                      <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
                      I understand that my information will be used for sports registration and communication purposes.
                      I confirm that all information provided is accurate and complete.
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 px-12 py-3 text-lg"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Submit Registration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default RegistrationForm;