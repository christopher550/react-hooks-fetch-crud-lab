import React from "react";

function AdminNavBar({ onChangePage }) {
  return (
    <nav>
      <button onClick={() => onChangePage("form")}>New Question</button>
      <button onClick={() => onChangePage("list")}>View Questions</button>
    </nav>
  );
}

export default AdminNavBar;
