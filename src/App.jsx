import { useState } from 'react'
import './style.css'

function App() {
  const [isChecked, setIsChecked] = useState(false); 
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([
    {id: 1, text: 'Complete online JavaScript course', completed: true},
    {id: 2, text: 'Jog around the park 3x', completed: false},
    {id: 3, text: '10 minutes meditation', completed: false},
    {id: 4, text: 'Read for 1 hour', completed: false},
    {id: 5, text: 'Pick up groceries', completed: false},
    {id: 6, text: 'Complete Todo App on Frontend Mentor', completed: false},
  ])
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'active') {
      return !todo.completed;
    } else {
      return todo.completed;
    }
  });

  const countActiveTodos = () => {
    const activeTodos = todos.filter((todo) => !todo.completed);
    return activeTodos.length;
  };

  const clearCompletedTodos = () => {
    const activeTodos = todos.filter((todo) => !todo.completed);
    setTodos(activeTodos);
  };

  const toggleTodoCompletion = (id) => {
    setTodos((prevTodos) =>
    prevTodos.map((todo) =>
    todo.id === id ? {...todo, completed: !todo.completed} : todo
    ))
  }

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const addCustomTodo = () => {
    if (text.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        text: text,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addCustomTodo();
    }
  };

return (
  <section>

    <div className={`big-container ${darkMode ? 'dark-mode' : ''}`}>
  <div className="container">
  <img 
      id='dark-mode-toggle'
      src={darkMode ? '/src/images/icon-sun.svg' : '/src/images/icon-moon.svg'} 
      alt="dark mode" 
      onClick={toggleDarkMode}
      />
    <div className="header">
      <h1>todo</h1>

      <div className="input-container">
        <input 
          type="text"
          id='text-input'
          placeholder='Create a new todo...'
          value={text}
          onChange={handleInputChange}
          onKeyDown={(e) => handleKeyDown(e)} 
        />
      </div>
      <div className="todo-field">
        
      {filteredTodos.map((todo) => (
    <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label htmlFor="circle-checkbox">
      <input
        type="checkbox"
        className='checkbox-round'
        checked={todo.completed}
        onChange={() => toggleTodoCompletion(todo.id)}
      />
      <span className='checkmark'></span>
      </label>
      <span>{todo.text}</span>
    </div>
  ))}
  <div className="buttons">
    <p>{countActiveTodos()} item(s) left</p>
      <button onClick={() => setFilter ('all')}>All</button>
        <button onClick={() => setFilter ('active')}>Active</button>
        <button onClick={() => setFilter ('completed')}>Completed</button>
        <button onClick={clearCompletedTodos}>Clear Completed</button>
  </div>

      </div>
    </div>

  </div>
  </div>
  </section>
);
}

export default App
