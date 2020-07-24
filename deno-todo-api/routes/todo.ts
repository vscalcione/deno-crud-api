import { Router } from "https://deno.land/x/oak/mod.ts";

import controller from '../controllers/todo.ts';

const router = new Router();

router
  .get("/todos", controller.getAll)
  .post("/todos", controller.create)
  .get("/todos/:id", controller.getById)
  .put("/todos/:id", controller.update)
  .delete("/todos/:id", controller.delete);

export default router;
