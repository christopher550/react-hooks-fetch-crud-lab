import React from "react";

function QuestionItem({ id, prompt, answers, correctAnswerIndex, onDelete, onUpdate }) {
  function handleChange(e) {
    const newIndex = Number(e.target.value);
    onUpdate(id, { correctAnswerIndex: newIndex });
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label htmlFor={`correct-answer-${id}`}>Correct Answer</label>
      <select
        id={`correct-answer-${id}`}
        aria-label="Correct Answer"
        value={correctAnswerIndex}
        onChange={handleChange}
      >
        {answers.map((answer, index) => (
          <option key={index} value={index}>
            {answer}
          </option>
        ))}
      </select>
      <button onClick={() => onDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
