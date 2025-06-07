import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Trophy, Heart, Zap, Shield } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: Trophy,
      title: "Excellence",
      description: "Striving for the highest standards in sports and technology"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a strong, inclusive sports community at SNU"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging cutting-edge technology for sports management"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Fueled by love for sports and student success"
    },
    {
      icon: Target,
      title: "Precision",
      description: "Accurate tracking and detailed performance analytics"
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Fair play and transparent competition standards"
    }
  ];

  const features = [
    "Real-time match tracking across 4 major sports",
    "Comprehensive player statistics and analytics",
    "Tournament management and scheduling",
    "Player registration and profile management",
    "Awards and recognition system",
    "Live leaderboards and rankings"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200">
            About SNU Sports Hub
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Revolutionizing Campus Sports
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              at Shiv Nadar University
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            SNU Sports Hub is a comprehensive digital platform designed to enhance the sports 
            experience at Shiv Nadar University. We combine cutting-edge technology with 
            passion for athletics to create an ecosystem that celebrates, tracks, and 
            promotes sporting excellence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To create a vibrant sports ecosystem that empowers every student at SNU to 
                participate, excel, and grow through athletics. We believe that sports are 
                not just about competition, but about building character, fostering teamwork, 
                and creating lifelong memories.
              </p>
              <p className="text-lg text-gray-600">
                Through innovative technology and data-driven insights, we aim to provide 
                coaches, players, and sports enthusiasts with the tools they need to reach 
                their full potential.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To be the leading sports management platform that transforms how 
                  university athletics are organized, tracked, and celebrated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <CardTitle className="text-xl text-gray-800">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">What We Offer</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <p className="text-gray-700">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 text-center">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Powered by Technology
                </h3>
                <p className="text-gray-700">
                  Built with modern web technologies and real-time databases to 
                  ensure fast, reliable, and scalable sports management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Developed by Shiv Nadar Venture Lab
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            This platform is proudly developed and maintained by the innovative team at 
            Shiv Nadar Venture Lab, combining technical expertise with deep understanding 
            of university sports culture.
          </p>
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
            <p className="text-xl opacity-90">
              Ready to be part of the SNU Sports revolution? 
              Register today and start your journey towards athletic excellence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;