import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    axios.get('https://to-do-list-kxjw.onrender.com/api/todo/')
      .then((res) => setTodos(res.data))
      .catch((err) => console.error('Error: ', err));
  };

  const completeTodo = async (id) => {
    const response = await axios.get(`https://to-do-list-kxjw.onrender.com/api/todo/complete/${id}`);
    const updatedTodo = response.data;

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === updatedTodo._id) {
          todo.complete = updatedTodo.complete;
        }

        return todo;
      })
    );
  };

  const handleAddTodo = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const addTodo = async () => {
    const response = await axios.post('https://to-do-list-kxjw.onrender.com/api/todo/new', {
      text: newTodo,
    });
    const newTodoData = response.data;

    setTodos([...todos, newTodoData]);
    setPopupActive(false);
    setNewTodo('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`https://to-do-list-kxjw.onrender.com/api/todo/delete/${id}`);
    setTodos((todos) => todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="App">
      <h1>Welcome, User</h1>
      <h4>Your tasks</h4>

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              className={'todo' + (todo.complete ? ' is-complete' : '')}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"></div>

              <div className="text">{todo.text}</div>

              <div
                className="delete-todo"
                onClick={(e) => {
                  e.stopPropagation(); // prevent the event from bubbling up to its parent div
                  deleteTodo(todo._id);
                }}
              >
                <i className="ri-delete-bin-2-line"></i>
              </div>
            </div>
          ))
        ) : (
          <p>You currently have no tasks</p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input"
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleAddTodo}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Home;
