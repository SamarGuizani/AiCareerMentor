function QuizQuestion({ question, selectedAnswer, onAnswer }) {
  try {
    return (
      <div className="card" data-name="quiz-question" data-file="components/QuizQuestion.js">
        <h3 className="text-2xl font-bold text-[var(--text-dark)] mb-6">
          {question.question}
        </h3>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`option-card ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => onAnswer(option)}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                  selectedAnswer === option 
                    ? 'border-[var(--primary-color)] bg-[var(--primary-color)]' 
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === option && (
                    <div className="icon-check text-sm text-white"></div>
                  )}
                </div>
                <span className="text-lg text-[var(--text-dark)]">{option}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('QuizQuestion component error:', error);
    return null;
  }
}
