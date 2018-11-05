import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { Crud } from '@utl';

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    unique: true
  },
  done: {
    type: Boolean,
    default: false
  }
});

todoSchema.plugin(uniqueValidator);
todoSchema.plugin(timestamp);

const todoModel = mongoose.model('todoModel', todoSchema);
const todoCrud = new Crud(todoModel);

export {
  todoCrud,
  todoModel
};
