import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const App = () => {
  const [data, setData] = useState([])
  const [isStatus, setIsStatus] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err))
  }, [isStatus])

  const onToggle = async (id, status, todo) => {
    const { _id, ...rest } = todo
    const newData = { ...rest, completed: !status }
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
      })
      setIsStatus(pre => !pre)
      console.log("working");

    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    console.log(id);
    const newData = data.filter((todo) => todo._id !== id);
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
      })
      setData(newData)
    } catch (err) {
      console.log(err)
    }

  }
  const button = { margin: "10px", padding: "10px 13px", backgroundColor: "orange", borderRadius: "10px", border: "none", cursor: "pointer" }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Todo App</h1>
      <Link to={'/create'} ><button style={button}>Add New Todo</button></Link>

      {data.map(todo => (
        <div className="todo-card" key={todo._id}>

          <div className="todo-header">
            <Link to={`/todo/${todo._id}`}>
              <h3>{todo.title}</h3>
            </Link>

            <span className={todo.completed ? "status done" : "status pending"}>
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </div>

          <p className="todo-desc">{todo.description}</p>

          <div className="todo-actions">
            <button
              className="btns toggle"
              onClick={() => onToggle(todo._id, todo.completed, todo)}
            >
              {todo.completed ? "Remove Mark" : "Add Mark"}
            </button>

            <button onClick={() => handleDelete(todo._id)} className='btns delete'>Delete</button>
          </div>

        </div>
      ))}
    </>
  )
}

export default App
