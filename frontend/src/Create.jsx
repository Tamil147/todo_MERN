import React, { useState } from 'react'
import './create.css'
import { useNavigate } from 'react-router'

export const Create = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        title: "",
        description: "",

    })

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            await fetch(`http://localhost:3000/users/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input)
            })
            navigate("/")

        } catch (err) {
            console.log(err)
        }


    }

    return (
        <div className="container">
            <div className="todo-form-container">
                <h2>Create New Todo</h2>

                <form className="todo-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" placeholder="Enter todo title" required value={input.title} onChange={(e) => setInput({ ...input, title: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea placeholder="Enter todo description" rows="4" value={input.description} onChange={(e) => setInput({ ...input, description: e.target.value })} ></textarea>
                    </div>

                    <button type="submit" className="btn-submit" onClick={handleCreate}>
                        Add Todo
                    </button>
                </form>
            </div>
        </div>
    )
}
