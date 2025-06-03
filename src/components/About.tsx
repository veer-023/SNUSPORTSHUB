
const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">PlayPulse</span>
        </h2>
        
        <div className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          <p className="mb-6">
            PlayPulse tracks live sports stats, ranks campus players, and celebrates athletic excellence—all in one place. 🚀
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold text-lg text-blue-800 mb-2">Live Tracking</h3>
              <p className="text-blue-600">Real-time stat updates from every campus match</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-semibold text-lg text-green-800 mb-2">Player Rankings</h3>
              <p className="text-green-600">Dynamic leaderboards across all sports</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="font-semibold text-lg text-orange-800 mb-2">Celebrate Success</h3>
              <p className="text-orange-600">Spotlight achievements and campus champions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
