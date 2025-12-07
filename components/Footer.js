function Footer() {
  try {
    return (
      <footer className="bg-[var(--text-dark)] text-white py-12" data-name="footer" data-file="components/Footer.js">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-lg flex items-center justify-center">
                  <div className="icon-graduation-cap text-xl text-white"></div>
                </div>
                <span className="text-xl font-bold">AI Career Mentor</span>
              </div>
              <p className="text-gray-400">
                Empowering professionals to find their perfect career path with AI-driven insights
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="index.html" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="quiz.html" className="text-gray-400 hover:text-white transition-colors">Take Quiz</a></li>
                <li><a href="career-path.html" className="text-gray-400 hover:text-white transition-colors">Career Paths</a></li>
                <li><a href="profile.html" className="text-gray-400 hover:text-white transition-colors">My Profile</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <div className="icon-mail text-lg"></div>
                  <span>support@aicareermentor.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="icon-phone text-lg"></div>
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AI Career Mentor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}
