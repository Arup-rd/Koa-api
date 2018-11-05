import { todoCrud } from './moduleA.model';


let todos;
let todo;
let newTd;

const todoIndex = async (ctx) => {
  try {
    todos = await todoCrud.get();
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = {
      body: todos
    };
  }
};

const singleTodo = async (ctx) => {
  try {
    todo = await todoCrud.single({ _id: ctx.params.id });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = {
      body: todo
    };
  }
};

const crTodo = async (ctx) => {
  try {
    newTd = await todoCrud.create(ctx.request.body);
  } catch (e) {
    ctx.throw(422, e.message);
  } finally {
    ctx.body = {
      body: newTd
    };
  }
};

const updateTodo = async (ctx) => {
  try {
    todo = await todoCrud.put({
      params: {
        _id: ctx.params.id
      },
      body: ctx.request.body
    });
  } catch (e) {
    ctx.throw(422, e.message);
  } finally {
    ctx.body = {
      body: todo
    };
  }
};

const deleteTodo = async (ctx) => {
  try {
    todo = await todoCrud.delete({ _id: ctx.params.id });
  } catch (e) {
    ctx.throw(404, e.message);
  } finally {
    ctx.body = {
      body: todo
    };
  }
};

export {
  todoIndex,
  crTodo,
  singleTodo,
  updateTodo,
  deleteTodo
};
