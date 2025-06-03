
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              PlayPulse
            </h3>
            <p className="text-gray-400 mb-4">
              Tracking campus athletic excellence, one stat at a time. Join the movement and celebrate sports on your campus! 🏆
            </p>
            <div className="flex space-x-4">
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📘</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📸</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🐦</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">💼</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Leaderboards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Player Stats</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Join a Club</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Sports</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">🏀 Basketball</a></li>
              <li><a href="#" className="hover:text-white transition-colors">🏏 Cricket</a></li>
              <li><a href="#" className="hover:text-white transition-colors">⚽ Football</a></li>
              <li><a href="#" className="hover:text-white transition-colors">🏸 Badminton</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 PlayPulse. Powered by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 font-semibold">
              Shiv Nadar Venture Lab
            </span>
            . Made with ❤️ for campus athletes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
