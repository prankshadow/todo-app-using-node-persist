import React, { Fragment, useState, useEffect, } from "react";
import "./todo.css"

const defaultEntry = { todo: "" }
function ToDoApp() {

  const host = "http://localhost:4000"

  const [todoName, setTodoName] = useState(defaultEntry);
  const [toDoList, setTodoList] = useState([]);

  //To handle the POST Request to the server when form got submitted.
  const handleSubmit = (e) => {
    e.preventDefault();
    const { todo } = todoName;
    try {
      fetch(`${host}/addTodo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo })
      })
        .then((response) => {
          response.json()
        })

      setTodoName(defaultEntry);

      // GET request to retrieve the updated data
      fetch(`${host}/getTodo`)
        .then((response) => response.json())
        .then(data => {
          setTodoList(data.data);
        });
    } catch (err) {
      console.error(err.message);
    }
  }

  // DELETE request when app restarts 
  useEffect(() => {
    fetch(`${host}/getTodo`, {
      method: 'DELETE'
    })
      .then(() => {
        setTodoList([]);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  //JSX code for Showing UI to the user
  return (
    <>
      <div>
        <h1 className='heading text-center pt-5'>To Do List App </h1>
      </div>
      {/* Input Todo Item */}
      <form onSubmit={handleSubmit}>
        <div className="input-group px-5 pb-5">
          <button type="button" className="btn btn-secondary fs-5 rounded-start" disabled>Enter the task:</button>
          <input className="form-control rounded-end" type="text" name="todo" placeholder="Add ToDoList Item" required value={todoName.todo}
            onChange={(e) => setTodoName({ ...todoName, todo: e.target.value })} />
          <button type="submit" value="Add" className="btn btn-success fs-5">Add Task</button>
        </div>
      </form>
      {/* Item stored */}
      <div>
        <ul className="unordered-list">
          {toDoList.map((storage) => (
            <li className="list-item" key={storage.id}>
              <span className="text-center">{storage.todo}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default ToDoApp;