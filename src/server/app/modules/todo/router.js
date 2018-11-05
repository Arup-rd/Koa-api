import {
  todoIndex,
  singleTodo,
  crTodo,
  updateTodo,
  deleteTodo
} from './controller';

export const baseUrl = '/api/todo';

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
      todoIndex
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      singleTodo
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      updateTodo
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      deleteTodo
    ]
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      crTodo
    ]
  }
];
