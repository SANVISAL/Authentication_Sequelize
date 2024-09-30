import { Response, Request, Router, NextFunction } from "express";
import { UserController } from "../controller/user.controller";
import { container } from "../configs/inversify.config";
import { existedUser } from "../middleware/user-exsitd";
import { createValidator } from "express-joi-validation";
import { createUserSchema } from "../constant/user/user.validator";

const router = Router();
const userController = container.get<UserController>(UserController);
const validator = createValidator({ passError: true });
// router.get("/", userController.getAllUsers);
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    validator.body(createUserSchema);
    existedUser(req.body), userController.createUser;
  } catch (error) {
    next(error);
  }
});
// router.get("/:id", userController.getUserById);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

// Global error handling middleware
router.use((err: Error, _req: Request, res: Response, _next: Function) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export = router;
