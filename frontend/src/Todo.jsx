import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Todo = () => {
    const [todo, setTodo] = useState({})
    const titleInput = useRef("")
    const descriptionInput = useRef("")
    const [isStatus, setIsStatus] = useState(false)
    const { id } = useParams()
    const [show, setShow] = useState(false);

    const handleClose = async () => {

        try {
            const { completed } = todo
            const newData = { title: titleInput.current.value, description: descriptionInput.current.value, completed }
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

        setShow(false);
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch("http://localhost:3000/users/" + id, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((res) => setTodo(res))
            .catch((err) => console.log(err))
    }, [isStatus])

    const onToggle = async (id, status, todo) => {

        const { _id, ...rest } = todo
        const newData = { ...rest, completed: status }
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


    return (
        <div className="todo-card">

            <div className="todo-header">
                <h3>{todo.title}</h3>
                <span className={todo.completed ? "status done" : "status pending"}>
                    {todo.completed ? "Completed" : "Pending"}
                </span>
            </div>

            <p className="todo-desc">{todo.description}</p>

            <div className="todo-actions">
                <button
                    className="btns toggle"
                    onClick={() => onToggle(todo._id, !todo.completed, todo)}
                >
                    {todo.completed ? "Mark Pending" : "Mark Done"}
                </button>


                <Button variant="warning" onClick={handleShow}>
                    Edit
                </Button>
                <Link to={"/"} style={{ color: "white", textDecoration: "none" }}><button className='btns toggle'>back</button></Link>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="todo-form">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" placeholder="Enter todo title" required
                                    ref={titleInput} defaultValue={todo.title} />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea placeholder="Enter todo description" rows="4" defaultValue={todo.description} ref={descriptionInput} ></textarea>
                            </div>


                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Todo