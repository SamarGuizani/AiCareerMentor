function Features() {
  try {
    const features = [
      {
        icon: 'brain',
        title: 'AI-Powered Analysis',
        description: 'Advanced algorithms analyze your skills and preferences to provide personalized recommendations'
      },
      {
        icon: 'target',
        title: 'Career Roadmap',
        description: 'Get a detailed step-by-step plan to achieve your career goals with milestones and resources'
      },
      {
        icon: 'users',
        title: 'Expert Guidance',
        description: 'Access insights from industry professionals and career mentors to make informed decisions'
      },
      {
        icon: 'trending-up',
        title: 'Growth Tracking',
        description: 'Monitor your progress and adjust your career path as you develop new skills and interests'
      }
    ];

    return (
      <section id="features" className="py-20 bg-white" data-name="features" data-file="components/Features.js">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--text-dark)] mb-4">
              Why Choose AI Career Mentor?
            </h2>
            <p className="text-xl text-[var(--text-light)] max-w-2xl mx-auto">
              Leverage cutting-edge AI technology to unlock your career potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className={`icon-${feature.icon} text-2xl text-white`}></div>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-dark)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-light)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Features component error:', error);
    return null;
  }
}
