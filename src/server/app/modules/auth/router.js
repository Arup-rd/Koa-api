import {
  authAll,
  authSingle,
  authCreate,
  authUpdate,
  authDelete,
  authLocal
} from './controller';

export const baseUrl = '/auth';

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
      authAll
    ]
  },
  {
    method: 'GET',
    route: '/:id',
    handlers: [
      authSingle
    ]
  },
  {
    method: 'PUT',
    route: '/:id',
    handlers: [
      authUpdate
    ]
  },
  {
    method: 'DELETE',
    route: '/:id',
    handlers: [
      authDelete
    ]
  },
  {
    method: 'POST',
    route: '/',
    handlers: [
      authCreate
    ]
  },
  {
    method: 'POST',
    route: '/local',
    handlers: [
      authLocal
    ]
  }
];
