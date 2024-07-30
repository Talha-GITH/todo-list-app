const axios = require('axios');

const baseUrl = 'http://localhost:3000/todos';

// Fetch all todos
axios.get(baseUrl)
  .then(response => console.log('Fetch all todos:', response.data))
  .catch(error => console.error('Error fetching todos:', error));

// Add a new todo
axios.post(baseUrl, {
  title: 'New Todo',
  description: 'Todo description'
})
.then(response => console.log('Add new todo:', response.data))
.catch(error => console.error('Error adding todo:', error));

// Update a todo
axios.put(`${baseUrl}/1`, {
  title: 'Updated Todo',
  description: 'Updated description'
})
.then(response => console.log('Update todo:', response.data))
.catch(error => console.error('Error updating todo:', error));

// Delete a todo
axios.delete(`${baseUrl}/1`)
  .then(() => console.log('Delete todo: Success'))
  .catch(error => console.error('Error deleting todo:', error));

// Mark a todo as done
axios.patch(`${baseUrl}/1/done`)
  .then(response => console.log('Mark todo as done:', response.data))
  .catch(error => console.error('Error marking todo as done:', error));
