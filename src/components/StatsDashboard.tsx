
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const StatsDashboard = () => {
  const performanceData = [
    { week: "Week 1", basketball: 85, cricket: 78, football: 92, badminton: 88 },
    { week: "Week 2", basketball: 88, cricket: 82, football: 89, badminton: 85 },
    { week: "Week 3", basketball: 92, cricket: 85, football: 87, badminton: 91 },
    { week: "Week 4", basketball: 89, cricket: 88, football: 94, badminton: 87 },
    { week: "Week 5", basketball: 94, cricket: 91, football: 91, badminton: 93 }
  ];

  const sportDistribution = [
    { name: "Basketball", value: 35, color: "#f97316" },
    { name: "Cricket", value: 28, color: "#22c55e" },
    { name: "Football", value: 25, color: "#3b82f6" },
    { name: "Badminton", value: 12, color: "#a855f7" }
  ];

  const chartConfig = {
    basketball: { label: "Basketball", color: "#f97316" },
    cricket: { label: "Cricket", color: "#22c55e" },
    football: { label: "Football", color: "#3b82f6" },
    badminton: { label: "Badminton", color: "#a855f7" }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Performance Analytics 📊
          </h2>
          <p className="text-xl text-gray-600">Track performance trends across all sports</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Trends Chart */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                📈 Weekly Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="basketball" 
                    stroke="#f97316" 
                    strokeWidth={3}
                    dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cricket" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="football" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="badminton" 
                    stroke="#a855f7" 
                    strokeWidth={3}
                    dot={{ fill: "#a855f7", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Sport Participation Distribution */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                🎯 Sport Participation Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <PieChart>
                  <Pie
                    data={sportDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sportDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🏀</div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm opacity-90">Active Players</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🏏</div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm opacity-90">Matches Played</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl mb-2">⚽</div>
                <div className="text-2xl font-bold">42</div>
                <div className="text-sm opacity-90">Teams</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🏸</div>
                <div className="text-2xl font-bold">234</div>
                <div className="text-sm opacity-90">Total Games</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default StatsDashboard;
