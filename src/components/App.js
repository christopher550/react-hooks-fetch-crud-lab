import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("list");

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  }

  function handleUpdateQuestion(id, updatedFields) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        setQuestions((questions) =>
          questions.map((q) =>
            q.id === updatedQuestion.id ? updatedQuestion : q
          )
        );
      });
  }

  return (
    <div>
      <AdminNavBar onChangePage={setPage} />
      {page === "form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </div>
  );
}

export default App;
