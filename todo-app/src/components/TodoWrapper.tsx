import React,{ useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoForm } from './TodoForm';
import { EditTodoForm } from './EditTodoForm';
import { Todo } from './Todo';

uuidv4();

interface todo {
  id: string;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

export const TodoWrapper = () => {
  const [todos, setTodos] = useState<todo[]>([]);

  const addTodo = (todo: string) => {
    setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
  };

  const editTask = (task: string, id: string) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo)));
  };

  return (
    <div className="TodoWrapper">
      <TodoForm addTodo={addTodo} />
      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={index} />
        ) : (
          <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
        )
      )}
    </div>
  );
};