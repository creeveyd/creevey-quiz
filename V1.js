// Get to know Creevey Quiz - Interactive Web App

import React, { useState } from 'react';

const questions = [
  {
    question: "Where is my accent from?",
    options: ["Scotland", "England", "Ireland", "Australia"],
    answer: 2,
    explanation: "Born and raised in Ireland — no mistaking that accent."
  },
  {
    question: "Which of these PG stories didn’t actually happen (yet)?",
    options: [
      "I found my prospect's SoundCloud and quoted his bars back to him weaving our value prop in",
      "I personally mailed the code for the new Halo game to a prospect’s address and beat him 1v1 for a meeting",
      "I started attending a prospect’s church for a few weeks to meet him in person",
      "I flew to Dallas to deliver a golf club to a prospect and almost passed out in 110° heat"
    ],
    answer: 2,
    explanation: "I’m bold, but I haven’t joined a church just yet..."
  },
  {
    question: "What percentage of companies I’ve worked for have had successful exits?",
    options: ["0%", "33%", "66%", "100%"],
    answer: 2,
    explanation: "66% — I’ve got a bit of a track record for picking winners."
  },
  {
    question: "I have video footage of me dancing with which NBA player at a concert?",
    options: ["Steph Curry", "Draymond Green", "Klay Thompson", "Kevin Durant"],
    answer: 3,
    explanation: "Yep, that’s me and KD. Unreal night."
  },
  {
    question: "I once generated how many views on a golf TikTok video?",
    options: ["10,000", "50,000", "150,000", "1 million"],
    answer: 2,
    explanation: "150k views. Golf content hits when the vibe is right."
  },
  {
    question: "What’s the name of my 3-year-old son?",
    options: ["Theo", "Teo", "Leo", "Mateo"],
    answer: 1,
    explanation: "His name is Teo — little legend."
  },
  {
    question: "Do you want Daniel as part of the team at Windsurf?",
    options: ["Yes", "No"],
    answer: 0,
    explanation: "There’s only one right answer here 😉"
  }
];

export default function GetToKnowCreeveyQuiz() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full bg-slate-700 rounded-2xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Get to know Creevey Quiz 🎯</h1>
        {!showResult ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">{questions[current].question}</h2>
            <ul className="space-y-3">
              {questions[current].options.map((opt, idx) => (
                <li
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`cursor-pointer px-4 py-2 rounded-xl border transition-colors duration-300 ${
                    isAnswered
                      ? idx === questions[current].answer
                        ? 'bg-green-600 border-green-400'
                        : idx === selected
                        ? 'bg-red-600 border-red-400'
                        : 'bg-slate-600 border-slate-500'
                      : 'hover:bg-slate-600 border-slate-500'
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
            {isAnswered && (
              <div className="mt-4">
                <p className="italic">{questions[current].explanation}</p>
                <button
                  onClick={nextQuestion}
                  className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
                >
                  {current === questions.length - 1 ? 'See Results' : 'Next Question'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">You scored {score} out of {questions.length}</h2>
            {score === questions.length ? (
              <p className="text-green-400">Perfect score — we’re vibing already 😎</p>
            ) : (
              <p className="text-yellow-300">Solid effort! Let's run it back sometime.</p>
            )}
            <p className="mt-6 text-sm italic">Built using Windsurf — by a non-dev who still knows how to close 💼</p>
          </div>
        )}
      </div>
    </div>
  );
}
