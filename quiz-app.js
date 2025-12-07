function QuizApp() {
  try {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [answers, setAnswers] = React.useState({});
    const [isComplete, setIsComplete] = React.useState(false);

    const questions = [
      {
        id: 1,
        question: "What type of work environment do you prefer?",
        options: [
          "Collaborative team environment",
          "Independent work with minimal supervision",
          "Mix of both team and solo work",
          "Fast-paced, dynamic environment"
        ]
      },
      {
        id: 2,
        question: "Which skills do you excel at?",
        options: [
          "Problem-solving and analytical thinking",
          "Creative and artistic abilities",
          "Communication and interpersonal skills",
          "Technical and hands-on skills"
        ]
      },
      {
        id: 3,
        question: "What motivates you most in your career?",
        options: [
          "Making a positive impact on society",
          "Financial success and stability",
          "Personal growth and learning",
          "Recognition and achievement"
        ]
      }
    ];

    const handleAnswer = (answer) => {
      setAnswers({ ...answers, [currentQuestion]: answer });
    };

    const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsComplete(true);
      }
    };

    const handlePrevious = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      }
    };

    if (isComplete) {
      return (
        <div className="min-h-screen" data-name="quiz-app" data-file="quiz-app.js">
          <Header />
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="icon-check text-3xl text-green-600"></div>
              </div>
              <h1 className="text-4xl font-bold text-[var(--text-dark)] mb-4">Quiz Complete!</h1>
              <p className="text-xl text-[var(--text-light)] mb-8">
                Great job! We're analyzing your responses to create your personalized career roadmap.
              </p>
              <a href="career-path.html" className="btn-primary inline-block">
                View Your Career Path
              </a>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen" data-name="quiz-app" data-file="quiz-app.js">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[var(--text-dark)]">Career Assessment Quiz</h2>
                <span className="text-[var(--text-light)]">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[var(--primary-color)] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <QuizQuestion 
              question={questions[currentQuestion]}
              selectedAnswer={answers[currentQuestion]}
              onAnswer={handleAnswer}
            />

            <div className="flex justify-between mt-8">
              <button 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-200 text-[var(--text-dark)] rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-all"
              >
                Previous
              </button>
              <button 
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('QuizApp component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<QuizApp />);
