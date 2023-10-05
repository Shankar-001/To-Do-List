import express from 'express';
import Todo from '../Models/todoModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

router.post('/new', async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
    });

    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new todo.' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the todo.' });
  }
});

router.get('/complete/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    todo.complete = !todo.complete;

    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the todo completion status.' });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found.' });
    }

    todo.text = req.body.text;

    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the todo.' });
  }
});

export default router;
