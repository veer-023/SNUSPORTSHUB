
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

const PlayerComparison = () => {
  const [selectedSport, setSelectedSport] = useState("basketball");

  const playerData = {
    basketball: {
      player1: { name: "Alex Chen", stats: [
        { stat: "Scoring", value: 95 },
        { stat: "Rebounds", value: 78 },
        { stat: "Assists", value: 85 },
        { stat: "Defense", value: 82 },
        { stat: "Shooting", value: 88 }
      ]},
      player2: { name: "Maya Patel", stats: [
        { stat: "Scoring", value: 88 },
        { stat: "Rebounds", value: 92 },
        { stat: "Assists", value: 91 },
        { stat: "Defense", value: 87 },
        { stat: "Shooting", value: 85 }
      ]}
    },
    cricket: {
      player1: { name: "Raj Sharma", stats: [
        { stat: "Batting", value: 92 },
        { stat: "Bowling", value: 75 },
        { stat: "Fielding", value: 88 },
        { stat: "Wickets", value: 78 },
        { stat: "Runs", value: 95 }
      ]},
      player2: { name: "Priya Singh", stats: [
        { stat: "Batting", value: 85 },
        { stat: "Bowling", value: 90 },
        { stat: "Fielding", value: 92 },
        { stat: "Wickets", value: 88 },
        { stat: "Runs", value: 87 }
      ]}
    }
  };

  const currentData = playerData[selectedSport as keyof typeof playerData];
  
  const comparisonData = currentData.player1.stats.map((stat, index) => ({
    stat: stat.stat,
    player1: stat.value,
    player2: currentData.player2.stats[index].value
  }));

  const chartConfig = {
    player1: { label: currentData.player1.name, color: "#3b82f6" },
    player2: { label: currentData.player2.name, color: "#f59e0b" }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Player Comparison ⚖️
          </h2>
          <p className="text-xl text-gray-600">Compare top performers side by side</p>
        </div>

        {/* Sport Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={selectedSport === "basketball" ? "default" : "ghost"}
              onClick={() => setSelectedSport("basketball")}
              className="mx-1"
            >
              🏀 Basketball
            </Button>
            <Button
              variant={selectedSport === "cricket" ? "default" : "ghost"}
              onClick={() => setSelectedSport("cricket")}
              className="mx-1"
            >
              🏏 Cricket
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Radar Chart Comparison */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Performance Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <RadarChart data={comparisonData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="stat" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar 
                    name={currentData.player1.name}
                    dataKey="player1" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar 
                    name={currentData.player2.name}
                    dataKey="player2" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Detailed Stats Comparison */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Detailed Comparison</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparisonData.map((stat) => (
                <div key={stat.stat} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{stat.stat}</span>
                    <span>{stat.player1} vs {stat.player2}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-20 text-sm text-blue-600 font-medium">
                        {currentData.player1.name}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stat.player1}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-sm text-gray-600">{stat.player1}</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 text-sm text-orange-600 font-medium">
                        {currentData.player2.name}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${stat.player2}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-sm text-gray-600">{stat.player2}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PlayerComparison;
