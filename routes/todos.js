const express = require('express');
const fs = require('fs');
const router = express.Router();

const FILE_PATH = './todos.json';

// read todos
const readTodosFromFile = () => {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
  }
  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(data);
};

// write todos
const writeTodosToFile = (todos) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2));
};

// Fetch Todos
router.get('/', (req, res) => {
  const todos = readTodosFromFile();
  const { search, filterByDate } = req.query;
  let filteredTodos = todos;

  if (search) {
    filteredTodos = filteredTodos.filter(todo => 
      todo.title.includes(search) || todo.description.includes(search));
  }

  if (filterByDate) {
    filteredTodos = filteredTodos.filter(todo => 
      new Date(todo.updatedAt).toISOString().split('T')[0] === filterByDate);
  }

  res.json(filteredTodos);
});

// Add Todo
router.post('/', (req, res) => {
  const todos = readTodosFromFile();
  const newTodo = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    ...req.body,
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  todos.push(newTodo);
  writeTodosToFile(todos);
  res.status(201).json(newTodo);
});

// Update Todo
router.put('/:id', (req, res) => {
  const todos = readTodosFromFile();
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const updatedTodo = {
    ...todos[todoIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  todos[todoIndex] = updatedTodo;
  writeTodosToFile(todos);
  res.json(updatedTodo);
});

// Delete Todo
router.delete('/:id', (req, res) => {
  const todos = readTodosFromFile();
  const todoId = parseInt(req.params.id, 10);
  const newTodos = todos.filter(todo => todo.id !== todoId);

  if (newTodos.length === todos.length) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  writeTodosToFile(newTodos);
  res.status(204).send();
});

// Mark as Done
router.patch('/:id/done', (req, res) => {
  const todos = readTodosFromFile();
  const todoId = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[todoIndex].completed = true;
  todos[todoIndex].updatedAt = new Date().toISOString();
  writeTodosToFile(todos);
  res.json(todos[todoIndex]);
});

module.exports = router;
