const express = require('express');
const bodyParser = require('body-parser');
const todosRoutes = require('./routes/todos');

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use('/todos', todosRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the MY Todo List API For Assignment! Use /todos endpoint to manage your todos.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
