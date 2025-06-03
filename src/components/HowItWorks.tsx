
const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      emoji: "🏃‍♂️",
      title: "Match Happens",
      description: "Students play sports across campus venues"
    },
    {
      step: 2,
      emoji: "📝",
      title: "Stats Submitted",
      description: "Players or referees submit match results and stats"
    },
    {
      step: 3,
      emoji: "📈",
      title: "You Rise on the Leaderboard",
      description: "Rankings update automatically and achievements unlock"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            How It Works ⚡
          </h2>
          <p className="text-xl text-gray-600">Simple. Fast. Automatic.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-green-400"></div>
              )}
              
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-3xl">{step.emoji}</span>
                </div>
                
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
