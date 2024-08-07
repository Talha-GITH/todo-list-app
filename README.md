# Todo List Application

## Overview

This is a simple Todo List application built using Node.js and Express.js. It provides a RESTful API for managing todo items with functionality to add, update, delete, mark as completed, and fetch todos with optional search and filters. The data is stored in a JSON file on the filesystem.

## System Design

### Architecture

The application follows a simple server-client architecture with the following components:

- **Node.js Server**: Handles the API requests and performs CRUD operations on the todo items.
- **Express.js**: A web framework used to set up the server and define the API routes.
- **Filesystem (fs module)**: Used to store and retrieve todo items in a JSON file (`todos.json`).

### API Endpoints

1. **Fetch Todos**
   - `GET /todos`
   - Query Parameters:
     - `search`: Filter todos by title or description
     - `filterByDate`: Filter todos by date of last update (format: YYYY-MM-DD)

2. **Add Todo**
   - `POST /todos`
   - Request Body:
     ```json
     {
       "title": "string",
       "description": "string"
     }
     ```

3. **Update Todo**
   - `PUT /todos/:id`
   - Request Body:
     ```json
     {
       "title": "string",
       "description": "string"
     }
     ```

4. **Delete Todo**
   - `DELETE /todos/:id`

5. **Mark as Done**
   - `PATCH /todos/:id/done`

## Implementation

### File Structure



## Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd todo-list-app
#   t o d o - l i s t - a p p 
 
 