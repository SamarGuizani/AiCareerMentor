function Hero() {
  try {
    return (
      <section className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white py-20" data-name="hero" data-file="components/Hero.js">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Your Perfect Career Path
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Let AI guide you to a fulfilling career based on your unique skills, interests, and aspirations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="quiz.html" className="btn-primary bg-white text-[var(--primary-color)] hover:bg-gray-100">
                Start Your Career Quiz
                <span className="icon-arrow-right text-lg ml-2 inline-block"></span>
              </a>
              <button 
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary border-white text-white hover:bg-white hover:text-[var(--primary-color)]"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}
