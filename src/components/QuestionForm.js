import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e, index) {
    const value = e.target.value;
    if (index != null) {
      const newAnswers = [...formData.answers];
      newAnswers[index] = value;
      setFormData({ ...formData, answers: newAnswers });
    } else {
      setFormData({ ...formData, [e.target.name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newQuestion) => onAddQuestion(newQuestion))
      .catch((err) => console.error("Error adding question:", err));

    setFormData({ prompt: "", answers: ["", "", "", ""], correctIndex: 0 });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt
        <input
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
      </label>
      {formData.answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}
          <input
            value={answer}
            onChange={(e) => handleChange(e, index)}
          />
        </label>
      ))}
      <label>
        Correct Answer
        <select
          value={formData.correctIndex}
          onChange={(e) =>
            setFormData({ ...formData, correctIndex: parseInt(e.target.value) })
          }
        >
          {formData.answers.map((_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
