// Updated: 2025-04-18 - Get to Know Creevey Quiz
import React, { useState } from 'react';

const questions = [
  {
    question: "Where am I from?",
    options: ["Scotland", "England", "Ireland", "Australia"],
    answer: 2,
    explanation: "Born and raised in Ireland"
  },
  {
    question: "Which of these PG stories didn't actually happen (yet)?",
    options: [
      "I found my prospect's SoundCloud and quoted his bars back to him weaving our value prop in",
      "I personally mailed the code for the new Halo game to a prospect's address and beat him 1v1 for a meeting",
      "I started attending a prospect's church for a few weeks to meet him in person",
      "I flew to Dallas to deliver a golf club to a prospect and almost passed out in 110° heat"
    ],
    answer: 2,
    explanation: "I'm bold, but I haven't joined a church just yet..."
  },
  {
    question: "What percentage of companies I've worked for have had successful exits?",
    options: ["0%", "33%", "66%", "100%"],
    answer: 2,
    explanation: "66% - 2 for 3 isn't bad."
  },
  {
    question: "I have video footage of me dancing with which NBA player at a concert?",
    options: ["Steph Curry", "Draymond Green", "Klay Thompson", "Kevin Durant"],
    answer: 3,
    explanation: "I'll show you the vid!"
  },
  {
    question: "I once generated how many views on a golf TikTok video?",
    options: ["10,000", "50,000", "150,000", "1 million"],
    answer: 2,
    explanation: "Not gonna quit the day job."
  },
  {
    question: "What's the name of my 3-year-old son?",
    options: ["Theo", "Teo", "Leo", "Mateo"],
    answer: 1,
    explanation: "His name is Teo — little legend."
  },
  {
    question: "Do you want Daniel as part of the team at Windsurf? (Always be closing 😉)",
    options: ["Yes", "No"],
    answer: 0,
    explanation: "There's only one right answer here 😉"
  }
];

const getScoreEmoji = (score, total) => {
  const percentage = (score / total) * 100;
  if (percentage === 100) return "🏆";
  if (percentage >= 80) return "🌟";
  if (percentage >= 60) return "👏";
  if (percentage >= 40) return "🎯";
  return "💪";
};

const getScoreMessage = (score, total) => {
  const percentage = (score / total) * 100;
  if (percentage === 100) return "Perfect match! When can you start? 😎";
  if (percentage >= 80) return "Impressive! We're definitely vibing! 🌟";
  if (percentage >= 60) return "Solid effort! You know me pretty well! 👏";
  if (percentage >= 40) return "Not bad! Let's chat more! 🎯";
  return "Thanks for playing! Let's connect! 💪";
};

export default function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelected(index);
    setIsAnswered(true);
    if (index === questions[current].answer) setScore(score + 1);
  };

  const nextQuestion = () => {
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const previousQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(null);
      setIsAnswered(false);
    }
  };

  const goHome = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setSelected(null);
    setIsAnswered(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Get to Know Creevey Quiz
            </h1>
            <button onClick={goHome} className="btn-secondary">
              Home
            </button>
          </div>

          {!showResult ? (
            <div className="animate-fadeIn">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-blue-200 font-medium">
                    Question {current + 1} of {questions.length}
                  </div>
                  <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-semibold leading-tight">
                  {questions[current].question}
                </h2>

                <ul className="space-y-3">
                  {questions[current].options.map((opt, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`quiz-option ${
                        isAnswered
                          ? idx === questions[current].answer
                            ? 'correct'
                            : idx === selected
                            ? 'incorrect'
                            : ''
                          : ''
                      }`}
                    >
                      <span className="relative z-10">{opt}</span>
                    </li>
                  ))}
                </ul>

                {isAnswered && (
                  <div className="animate-scaleIn">
                    <p className="text-lg italic text-blue-200 mb-4">
                      {questions[current].explanation}
                    </p>
                    <div className="flex gap-4">
                      {current > 0 && (
                        <button onClick={previousQuestion} className="btn-secondary">
                          ← Back
                        </button>
                      )}
                      <button onClick={nextQuestion} className="btn-primary">
                        {current === questions.length - 1 ? "See Results" : "Next Question →"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="animate-scaleIn text-center space-y-6">
              <div className="text-6xl mb-4">{getScoreEmoji(score, questions.length)}</div>
              <h2 className="text-3xl font-bold mb-2">
                You scored {score} out of {questions.length}
              </h2>
              <p className="text-xl text-blue-200">
                {getScoreMessage(score, questions.length)}
              </p>
              <button onClick={goHome} className="btn-primary mt-8">
                Take Quiz Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
