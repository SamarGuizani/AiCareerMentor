function CareerPathApp() {
  try {
    const careerPath = {
      title: "Software Developer",
      description: "Based on your quiz responses, we recommend pursuing a career in software development",
      roadmap: [
        {
          phase: "Foundation",
          duration: "3-6 months",
          icon: "book-open",
          skills: ["HTML/CSS", "JavaScript Basics", "Git & GitHub"],
          resources: ["FreeCodeCamp", "MDN Web Docs", "Codecademy"]
        },
        {
          phase: "Core Skills",
          duration: "6-12 months",
          icon: "code",
          skills: ["React/Angular", "Node.js", "Database Management"],
          resources: ["Udemy Courses", "Official Documentation", "YouTube Tutorials"]
        },
        {
          phase: "Advanced",
          duration: "12-18 months",
          icon: "trending-up",
          skills: ["System Design", "Cloud Services", "DevOps"],
          resources: ["AWS Certification", "System Design Courses", "Real Projects"]
        },
        {
          phase: "Professional",
          duration: "Ongoing",
          icon: "briefcase",
          skills: ["Team Leadership", "Architecture", "Mentorship"],
          resources: ["Industry Conferences", "Open Source", "Continuous Learning"]
        }
      ]
    };

    return (
      <div className="min-h-screen" data-name="career-path-app" data-file="career-path-app.js">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[var(--text-dark)] mb-4">
                Your Personalized Career Path
              </h1>
              <p className="text-xl text-[var(--text-light)] mb-2">
                {careerPath.title}
              </p>
              <p className="text-[var(--text-light)]">
                {careerPath.description}
              </p>
            </div>

            <div className="space-y-6">
              {careerPath.roadmap.map((phase, index) => (
                <CareerCard key={index} phase={phase} index={index} />
              ))}
            </div>

            <div className="mt-12 card text-center">
              <h3 className="text-2xl font-bold text-[var(--text-dark)] mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-[var(--text-light)] mb-6">
                Save your career path and track your progress
              </p>
              <a href="profile.html" className="btn-primary inline-block">
                Go to Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CareerPathApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CareerPathApp />);
