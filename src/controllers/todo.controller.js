import { Todo } from "../models/todo.model.js";

export async function createTodo(req, res, next) {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
}

export async function listTodos(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const filter = {};

    if (req.query.completed === "true") {
      filter.completed = true;
    } else if (req.query.completed === "false") {
      filter.completed = false;
    }

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: "i" };
    }

    const total = await Todo.countDocuments(filter);
    const pages = total === 0 ? 0 : Math.ceil(total / limit);
    const data = await Todo.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      data,
      meta: {
        total,
        page,
        limit,
        pages,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getTodo(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: { message: "Todo not found" } });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

export async function updateTodo(req, res, next) {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ error: { message: "Todo not found" } });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
}

export async function toggleTodo(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: { message: "Todo not found" } });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
}

export async function deleteTodo(req, res, next) {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: { message: "Todo not found" } });
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
