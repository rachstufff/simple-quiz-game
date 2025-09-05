import { useState, useEffect } from "react";
import "./App.css";

const allQuestions = [
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
    answer: "Tokyo",
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"],
    answer: "Da Vinci",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What year did World War II end?",
    options: ["1945", "1939", "1950", "1942"],
    answer: "1945",
  },
  {
    question: "Which element has the chemical symbol O?",
    options: ["Gold", "Oxygen", "Osmium", "Ozone"],
    answer: "Oxygen",
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["China", "Brazil", "UK", "Russia"],
    answer: "Brazil",
  },
  {
    question: "What is the smallest prime number?",
    options: ["1", "2", "3", "5"],
    answer: "2",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
    answer: "Shakespeare",
  },
  {
    question: "What is the boiling point of water in Celsius?",
    options: ["100", "0", "50", "212"],
    answer: "100",
  },
  {
    question: "Which continent is the Sahara Desert located in?",
    options: ["Asia", "Africa", "Australia", "Europe"],
    answer: "Africa",
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Pepper"],
    answer: "Avocado",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Mercury", "Neptune"],
    answer: "Mars",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    answer: "Au",
  },
];

// Always use 7 questions per round
function getQuizQuestions() {
  return shuffleArray(allQuestions).slice(0, 7);
}

// Utility: shuffle array
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);

  // Get 7 random questions at start
  useEffect(() => {
    setQuestions(getQuizQuestions());
  }, []);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      const next = current + 1;
      if (next < questions.length) {
        setCurrent(next);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 800);
  };

  const restartQuiz = () => {
    setQuestions(getQuizQuestions());
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
  };

  const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

  if (questions.length === 0) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 px-4">
      <div className="quiz-card">
        {!finished ? (
          <>
            {/* Progress section */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Question {current + 1} of {questions.length}
              </h2>
              <div className="progress-bg">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <h1 className="text-xl font-bold mb-6 text-gray-800">
              {questions[current].question}
            </h1>

            {/* Options */}
            <div className="grid gap-3">
              {questions[current].options.map((opt) => {
                let btnStyle = "btn-option";
                if (selected) {
                  if (opt === questions[current].answer) {
                    btnStyle = "btn-option btn-correct";
                  } else if (opt === selected) {
                    btnStyle = "btn-option btn-wrong";
                  } else {
                    btnStyle = "btn-option btn-disabled";
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => !selected && handleAnswer(opt)}
                    className={btnStyle}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Result screen */}
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              🎉 Quiz Completed!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              You scored <span className="font-bold">{score}</span> out of{" "}
              {questions.length}
            </p>
            <p className="text-gray-600 mb-6">
              {score === questions.length
                ? "Perfect score! 🏆"
                : score >= questions.length / 2
                ? "Well done! 👍"
                : "Keep practicing 💡"}
            </p>
            <button onClick={restartQuiz} className="btn-restart">
              Restart Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}
