function Header() {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const navigateToSection = (sectionId) => {
      const currentPath = window.location.pathname;
      const element = document.getElementById(sectionId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (!currentPath.includes('index.html') && currentPath !== '/') {
        window.location.href = `index.html#${sectionId}`;
      }
    };

    return (
      <header className="bg-white shadow-sm sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-lg flex items-center justify-center">
                <div className="icon-graduation-cap text-xl text-white"></div>
              </div>
              <span className="text-2xl font-bold text-[var(--primary-color)]">AI Career Mentor</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="index.html" className="text-[var(--text-dark)] hover:text-[var(--primary-color)] font-medium transition-colors">Home</a>
              <a href="quiz.html" className="text-[var(--text-dark)] hover:text-[var(--primary-color)] font-medium transition-colors">Quiz</a>
              <a href="career-path.html" className="text-[var(--text-dark)] hover:text-[var(--primary-color)] font-medium transition-colors">Career Path</a>
              <a href="profile.html" className="text-[var(--text-dark)] hover:text-[var(--primary-color)] font-medium transition-colors">Profile</a>
            </div>

            <button 
              className="md:hidden text-[var(--text-dark)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`icon-${isMenuOpen ? 'x' : 'menu'} text-2xl`}></div>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2">
              <a href="index.html" className="block py-2 text-[var(--text-dark)] hover:text-[var(--primary-color)] font-medium">Home</a>
              <a href="quiz.html" className="block py-2 text-[var(--text-dark)] hover:text-[var(--primary-color)] font-medium">Quiz</a>
              <a href="career-path.html" className="block py-2 text-[var(--text-dark)] hover:text-[var(--primary-color)] font-medium">Career Path</a>
              <a href="profile.html" className="block py-2 text-[var(--text-dark)] hover:text-[var(--primary-color)] font-medium">Profile</a>
            </div>
          )}
        </nav>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}
