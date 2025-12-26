import React, { useState } from 'react';
import { RotateCcw, Eye } from 'lucide-react';

const CrosswordGame = () => {
  const gameData = {
    verticalKeyword: "PHATTRIEN",
    verticalCol: 7,
    questions: [
      { num: 1, difficulty: "dễ", question: "Kỹ năng giúp học sinh làm việc chung và hỗ trợ lẫn nhau trong học tập là gì?", answer: "PHOIHOP", startCol: 1 },
      { num: 2, difficulty: "dễ", question: "Ước mơ, khát vọng mà mỗi người nuôi dưỡng cho tương lai gọi là gì?", answer: "HOAIBAO", startCol: 7 },
      { num: 3, difficulty: "trung bình", question: "Việc vận dụng kiến thức, kỹ năng đã học vào thực tế học tập và cuộc sống gọi là gì?", answer: "APDUNG", startCol: 7 },
      { num: 4, difficulty: "dễ", question: "Phẩm chất giúp học sinh tin vào bản thân khi giao tiếp và học tập là gì?", answer: "TUTIN", startCol: 5 },
      { num: 5, difficulty: "khó", question: "Quá trình hoàn thiện bản thân về nhận thức, kỹ năng và nhân cách theo thời gian gọi là gì?", answer: "TRUONGTHANH", startCol: 1 },
      { num: 6, difficulty: "trung bình", question: "Phẩm chất giúp con người bền bỉ, không bỏ cuộc trước khó khăn là gì?", answer: "KIENTRI", startCol: 2 },
      { num: 7, difficulty: "khó", question: "Sức mạnh tinh thần giúp con người vượt qua thử thách để đạt mục tiêu là gì?", answer: "YCHI", startCol: 4 },
      { num: 8, difficulty: "khó", question: "Công việc gắn bó lâu dài, phù hợp với năng lực và định hướng tương lai của mỗi người gọi là gì?", answer: "NGHENGHIEP", startCol: 4 },
      { num: 9, difficulty: "trung bình", question: "Tổng hợp các khả năng giúp con người học tập và làm việc hiệu quả gọi là gì?", answer: "NANGLUC", startCol: 5 }
    ]
  };

  const [answers, setAnswers] = useState(
    gameData.questions.map(q => Array(q.answer.length).fill(''))
  );
  const [completed, setCompleted] = useState(false);

  const handleLetterInput = (qIndex, letterIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = [...newAnswers[qIndex]];
    newAnswers[qIndex][letterIndex] = value.toUpperCase();
    setAnswers(newAnswers);
    checkCompletion(newAnswers);
  };

  const checkCompletion = (currentAnswers) => {
    const allCorrect = gameData.questions.every((q, i) => 
      currentAnswers[i].join('') === q.answer
    );
    setCompleted(allCorrect);
  };

  const resetGame = () => {
    setAnswers(gameData.questions.map(q => Array(q.answer.length).fill('')));
    setCompleted(false);
  };

  const showAnswers = () => {
    const newAnswers = gameData.questions.map(q => q.answer.split(''));
    setAnswers(newAnswers);
    checkCompletion(newAnswers);
  };

  const getQuestionColor = (index) => {
    return '#3B82F6';
  };

  const isVerticalCell = (qIndex, letterIndex) => {
    const question = gameData.questions[qIndex];
    const absoluteCol = question.startCol + letterIndex;
    return absoluteCol === gameData.verticalCol;
  };

  const getCellColor = (qIndex, letterIndex) => {
    if (isVerticalCell(qIndex, letterIndex)) {
      const letter = answers[qIndex][letterIndex];
      const correctLetter = gameData.questions[qIndex].answer[letterIndex];
      return letter === correctLetter ? 'bg-amber-400 border-amber-500' : 'bg-amber-100 border-amber-300';
    }
    return 'bg-white border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-slate-800 mb-3">
            Ô Chữ Bí Mật
          </h1>
          <p className="text-lg text-slate-600">Kỹ Năng Sống & Hướng Nghiệp</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Bảng ô chữ - 2 cột */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              
              {/* Từ khóa dọc */}
              <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-800 mb-3 text-center">
                  🔑 Từ Khóa Dọc
                </h3>
                <div className="flex justify-center gap-2">
                  {gameData.questions.map((q, i) => {
                    const letterIndex = gameData.verticalCol - q.startCol;
                    const letter = (letterIndex >= 0 && letterIndex < q.answer.length) ? (answers[i][letterIndex] || '_') : '_';
                    const correctLetter = (letterIndex >= 0 && letterIndex < q.answer.length) ? q.answer[letterIndex] : '';
                    
                    return (
                      <div 
                        key={i}
                        className={`w-10 h-10 flex items-center justify-center border-2 rounded-lg text-xl font-bold ${
                          letter === correctLetter && letter !== '_' ? 'bg-amber-400 border-amber-500 text-amber-900' : 'bg-white border-amber-300 text-gray-400'
                        }`}
                      >
                        {letter}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lưới ô chữ */}
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                  <table className="border-collapse">
                    <tbody>
                      {gameData.questions.map((question, qIndex) => (
                        <tr key={qIndex}>
                          <td className="pr-3 pb-2">
                            <div 
                              className="w-9 h-9 flex items-center justify-center rounded-lg text-white font-bold text-base shadow-sm"
                              style={{ backgroundColor: getQuestionColor(qIndex) }}
                            >
                              {question.num}
                            </div>
                          </td>
                          
                          {Array(16).fill(0).map((_, colIndex) => {
                            const letterIndex = colIndex - question.startCol;
                            const isInWord = letterIndex >= 0 && letterIndex < question.answer.length;
                            
                            if (isInWord) {
                              return (
                                <td key={colIndex} className="p-0 pb-2">
                                  <input
                                    type="text"
                                    maxLength="1"
                                    value={answers[qIndex][letterIndex]}
                                    onChange={(e) => handleLetterInput(qIndex, letterIndex, e.target.value)}
                                    className={`w-10 h-10 border-2 text-center text-lg font-bold uppercase focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${getCellColor(qIndex, letterIndex)}`}
                                  />
                                </td>
                              );
                            } else {
                              return <td key={colIndex} className="w-10 h-10 pb-2"></td>;
                            }
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {completed && (
                <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-4 rounded-xl text-xl font-bold shadow-lg">
                  🎉 Xuất sắc! Bạn đã hoàn thành!
                </div>
              )}

              {/* Nút điều khiển */}
              <div className="mt-6 flex gap-3 justify-center">
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-semibold flex items-center gap-2 shadow-md transition-all hover:shadow-lg"
                >
                  <RotateCcw size={20} />
                  Chơi lại
                </button>
                <button
                  onClick={showAnswers}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 shadow-md transition-all hover:shadow-lg"
                >
                  <Eye size={20} />
                  Xem đáp án
                </button>
              </div>
            </div>
          </div>

          {/* Danh sách câu hỏi - 1 cột */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 sticky top-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 pb-3 border-b border-gray-200">
                📝 Danh sách câu hỏi
              </h2>
              <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {gameData.questions.map((q, index) => (
                  <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-all">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: getQuestionColor(index) }}
                      >
                        {q.num}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-700 leading-relaxed">{q.question}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CrosswordGame;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CrosswordGame />);
