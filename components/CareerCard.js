function CareerCard({ phase, index }) {
  try {
    return (
      <div className="card" data-name="career-card" data-file="components/CareerCard.js">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] rounded-xl flex items-center justify-center">
              <div className={`icon-${phase.icon} text-2xl text-white`}></div>
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-2xl font-bold text-[var(--text-dark)]">
                Phase {index + 1}: {phase.phase}
              </h3>
              <span className="text-sm text-[var(--text-light)] bg-gray-100 px-3 py-1 rounded-full">
                {phase.duration}
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-[var(--text-dark)] mb-2">
                Skills to Learn:
              </h4>
              <div className="flex flex-wrap gap-2">
                {phase.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="bg-[var(--primary-color)] bg-opacity-10 text-[var(--primary-color)] px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-[var(--text-dark)] mb-2">
                Recommended Resources:
              </h4>
              <ul className="space-y-1">
                {phase.resources.map((resource, idx) => (
                  <li key={idx} className="flex items-center text-[var(--text-light)]">
                    <div className="icon-check text-sm text-green-500 mr-2"></div>
                    {resource}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CareerCard component error:', error);
    return null;
  }
}
