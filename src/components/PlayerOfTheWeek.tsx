
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";

const PlayerOfTheWeek = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Player of the Week 🌟
          </h2>
          <p className="text-xl text-gray-600">Celebrating campus athletic excellence</p>
        </div>
        
        <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-r from-white to-yellow-50">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-80 md:h-auto bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-6xl">🏀</span>
                  </div>
                  <p className="text-lg opacity-90">Featured Player Photo</p>
                </div>
              </div>
              
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <Award className="text-yellow-500 mr-2" size={24} />
                  <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">Player of the Week</span>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Sarah Johnson</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Sport</span>
                    <span className="font-semibold text-gray-800">Basketball 🏀</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Games Played</span>
                    <span className="font-semibold text-gray-800">5 games</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Average Points</span>
                    <span className="font-semibold text-gray-800">31.2 PPG</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Field Goal %</span>
                    <span className="font-semibold text-gray-800">67.8%</span>
                  </div>
                </div>
                
                <p className="text-gray-600 italic">
                  "Dominating the court with incredible shooting accuracy and leadership. Sarah led her team to 4 consecutive victories this week!" 🔥
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PlayerOfTheWeek;
