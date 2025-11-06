import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <section>
      <h1>Question List</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            id={question.id}
            prompt={question.prompt}
            answers={question.answers || ["A1", "A2", "A3", "A4"]}
            correctAnswerIndex={question.correctAnswerIndex}
            onDelete={onDeleteQuestion}
            onUpdate={onUpdateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
